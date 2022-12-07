import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import { RoleModel } from '../role/role';

/**
 * Model description here for TypeScript hints.
 */
export const ProfileModel = types
  .model('Profile')
  .props({
    id: types.maybe(types.number),
    username: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    role: types.maybeNull(RoleModel),
    is_active: types.maybeNull(types.boolean),
    create_at: types.maybeNull(types.string),
    update_at: types.maybeNull(types.string),
  });

type ProfileType = Instance<typeof ProfileModel>;
export interface Profile extends ProfileType {}
type ProfileSnapshotType = SnapshotOut<typeof ProfileModel>;
export interface ProfileSnapshot extends ProfileSnapshotType {}
export const createProfileDefaultModel = () => types.optional(ProfileModel, {});
export const createProfile = () => ProfileModel.create({});
