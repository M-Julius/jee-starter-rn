import {Instance, SnapshotOut, types} from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const RoleModel = types
  .model('Role')
  .props({
    role_id: types.maybe(types.number),
    role_name: types.maybeNull(types.string),
    is_active: types.maybeNull(types.boolean)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

type RoleType = Instance<typeof RoleModel>;
export interface Role extends RoleType {}
type RoleSnapshotType = SnapshotOut<typeof RoleModel>;
export interface RoleSnapshot extends RoleSnapshotType {}
export const createRoleDefaultModel = () => types.optional(RoleModel, {});
export const createRole = () => RoleModel.create({});
