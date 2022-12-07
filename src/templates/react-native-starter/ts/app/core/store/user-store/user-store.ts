/* eslint-disable no-return-assign */
import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Profile, ProfileModel} from '../../model/profile/profile';
import {Token, TokenModel} from '../../model/token/token';
import {withEnvironment} from '../extensions/with-environment';

export const UserStoreModel = types
  .model('UserStore')
  .props({
    token: types.optional(TokenModel, {} as any),
    loggedIn: false,
    iProfile: types.maybeNull(ProfileModel),
    quickLogin: false,
  })
  .extend(withEnvironment)
  .views((self) => ({
    get profile() {
      return self.loggedIn ? self.iProfile : null;
    },
  }))
  .actions((self) => ({
    login: (token: Token, loggedIn: boolean = true) => {
      self.token = token;
      self.loggedIn = loggedIn;
    },
    doQuickLogin: () => {
      if (self.quickLogin) self.loggedIn = true;
    },
    setProfile: (profile: Profile) => {
      self.iProfile = profile;
    },
    setQuickLogin: (value: boolean) => {
      self.quickLogin = value;
    },
    refresh: (token: Token) => {
      self.token.token = token.token;
    },
    logout: () => {
      if (self.quickLogin) {
        self.loggedIn = false;
        return;
      }
      self.token = {} as any;
      self.loggedIn = false;
      self.iProfile = null;
    },
  }));

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {});
