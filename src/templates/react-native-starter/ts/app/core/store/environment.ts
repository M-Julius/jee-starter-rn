import {onSnapshot} from 'mobx-state-tree';
import Api from '../services/api';
import storage from '../utils/storage';
import {UserStore, UserStoreModel} from './user-store/user-store';

const USER_STATE_STORAGE_KEY = 'usr';

export class Environment {
  debug: boolean = false;

  api: Api;

  userStore?: UserStore;

  geoKey?: string;

  constructor() {
    this.debug = process.env.REACT_APP_DEBUG === 'true';
    this.userStore = UserStoreModel.create();
    this.api = new Api(this.debug, process.env.REACT_APP_URL);
    this.geoKey = process.env.REACT_GEO_KEY;
  }

  async setup() {
    // allow each service to setup
    try {
      this.userStore = UserStoreModel.create(await storage.load(USER_STATE_STORAGE_KEY));
    } catch (e) {
      this.userStore = UserStoreModel.create({});
    }

    // track changes & save to storage
    onSnapshot(this.userStore!, (snapshot) => storage.save(USER_STATE_STORAGE_KEY, snapshot));
    this.api.userStore = this.userStore;
    await this.api.setup();
  }
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function setupEnvironment() {
  const env = new Environment();
  await env.setup();
  return env;
}
