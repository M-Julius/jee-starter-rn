import {Instance, SnapshotOut, types} from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const TokenModel = types
  .model('Token')
  .props({
    token: types.maybeNull(types.string),
    refreshtoken: types.maybeNull(types.string),
  });

type TokenType = Instance<typeof TokenModel>;
export interface Token extends TokenType {}
type TokenSnapshotType = SnapshotOut<typeof TokenModel>;
export interface TokenSnapshot extends TokenSnapshotType {}
export const createTokenDefaultModel = () => types.optional(TokenModel, {});
export const createToken = () => TokenModel.create({});
