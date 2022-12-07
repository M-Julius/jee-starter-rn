import {
  getEnv, Instance, SnapshotOut, types,
} from 'mobx-state-tree';
import {UserServiceModel} from '../../services/user-service/user-service';
import {Environment} from '../environment';
import {LanguageStoreModel} from '../language-store/language-store';
import {UserStoreModel} from '../user-store/user-store';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  languageStore: types.optional(LanguageStoreModel, {} as any),
  userService: types.optional(UserServiceModel, {} as any),
  userStores: types.optional(UserStoreModel, {} as any),
})
  .views((self) => ({
    get userStore() {
      return getEnv<Environment>(self).userStore;
    },
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
