import {getEnv, IStateTreeNode} from 'mobx-state-tree';
import {Environment} from '../environment';

/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
// eslint-disable-next-line import/prefer-default-export
export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    /**
     * The environment.
     */
    get environment() {
      return getEnv<Environment>(self);
    },
    get apiSauce() {
      return getEnv<Environment>(self).api.apisauce;
    },
    get plainApiSauce() {
      return getEnv<Environment>(self).api.plainApisauce;
    },
    get externalApiSauce() {
      return getEnv<Environment>(self).api.externalApisauce;
    },
  },
});
