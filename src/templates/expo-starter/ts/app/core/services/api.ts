import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {Mutex} from 'async-mutex';
import {UserStore} from '../store/user-store/user-store';
import {resetNavigation} from '../utils/navigation-utils';
import {RefreshTokenSuccess} from './api.response';
import {ApiError, BaseResponse} from './api.types';
import Either from './either';

export async function handleResponse<T>(
  request: () => Promise<ApiResponse<T | any>>,
): Promise<Either<T, ApiError<T>>> {
  try {
    const result = await request();
    __DEV__ && console.log('RESPONSE REQUEST : ', result);
    if (
      !result.ok ||
      (result.data?.metadata?.response_code !== '000' &&
        !result.config?.url?.includes('google'))
    ) {
      return new Either({
        left: {
          message:
            result.data?.metadata?.message ??
            result.originalError?.message ??
            '',
          name: result?.problem ?? 'Failed Request',
          statusCode: result.data?.metadata?.response_code ?? '0',
          data: result.data,
        },
      });
    }
    return new Either({right: result.data});
  } catch (e) {
    if (typeof e === 'string') return new Either({left: new Error(e)});
    return new Either({left: e as Error});
  }
}

export default class Api {
  debug: boolean = false;

  externalApisauce: ApisauceInstance;

  plainApisauce: ApisauceInstance;

  apisauce: ApisauceInstance;

  userStore?: UserStore;

  mutex: Mutex;

  constructor(debug: boolean, url?: string) {
    this.externalApisauce = create({baseURL: undefined});
    this.plainApisauce = create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.apisauce = create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.debug = debug;
    this.mutex = new Mutex();
  }

  async setup() {
    this.apisauce.axiosInstance.interceptors.request.use((config) => {
      if (
        this.userStore!.loggedIn &&
        this.userStore!.token.refreshtoken != null
      ) {
        config.headers.Authorization = `Bearer ${this.userStore!.token.token}`;
      }
      return config;
    });
    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {status} = error?.response;

        if (status === 401) {
          return this.mutex.runExclusive(async () => {
            const refresh = await this.refreshToken();
            if (refresh.isRight) {
              error.config.headers.Authorization = `Bearer ${
                this.userStore!.token.token
              }`;
              try {
                return await this.plainApisauce.axiosInstance(error.config);
              } catch (err: any) {
                if (err.response?.status === 401) {
                  this.userStore!.logout();
                  resetNavigation();
                  return err;
                }
                return err;
              }
            } else {
              this.userStore!.logout();
              resetNavigation();
              return error;
            }
          });
        }
        return error;
      },
    );
  }

  async refreshToken() {
    const result = await handleResponse<BaseResponse<RefreshTokenSuccess>>(() =>
      this.plainApisauce.post('/auth/refresh-token', {
        refresh_token: this.userStore?.token?.refreshtoken,
      }),
    );
    if (result.isRight)
      this.userStore!.refresh({
        token: result.right!.data?.access_token ?? '',
        refreshtoken:
          result.right?.data?.access_token ??
          this.userStore?.token.refreshtoken ??
          '',
      });
    return result;
  }
}
