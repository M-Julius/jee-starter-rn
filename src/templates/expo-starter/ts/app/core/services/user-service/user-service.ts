import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {withEnvironment} from '../../store/extensions/with-environment';
import {handleResponse} from '../api';
import {UserLoginSuccess} from '../api.response';
import {BaseResponse} from '../api.types';

type LoginUser = {
  username: string;
  password: string;
};

/**
 * Model description here for TypeScript hints.
 */
export const UserServiceModel = types
  .model('UserService')
  .props({})
  .extend(withEnvironment)
  .actions((self) => ({
    loginUser: async (props: LoginUser) => {
      const result = await handleResponse<BaseResponse<UserLoginSuccess>>(() =>
        self.plainApiSauce.post('/auth/login', props),
      );
      if (result.isRight) {
        self.environment.userStore?.login({
          token: result.right?.data?.access_token ?? '',
          refreshtoken: result.right?.data?.refresh_token ?? '',
        });
      }
      return result;
    },
  }))
  .actions((self) => ({}));

type UserServiceType = Instance<typeof UserServiceModel>;
export interface UserService extends UserServiceType {}
type UserServiceSnapshotType = SnapshotOut<typeof UserServiceModel>;
export interface UserServiceSnapshot extends UserServiceSnapshotType {}
export const createUserServiceDefaultModel = () =>
  types.optional(UserServiceModel, {});
export const createUserService = () => UserServiceModel.create({});
