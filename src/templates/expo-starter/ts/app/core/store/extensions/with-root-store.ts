import {getRoot, IStateTreeNode, TypeOrStateTreeNodeToStateTreeNode} from 'mobx-state-tree';

/**
 * Adds a rootStore property to the node for a convenient
 * and strongly typed way for stores to access other stores.
 */
// eslint-disable-next-line import/prefer-default-export
export const withRootStore = <T>(self: IStateTreeNode) => ({
  views: {
    /**
     * The root store.
     */
    get rootStore(): TypeOrStateTreeNodeToStateTreeNode<T> {
      return getRoot<T>(self);
    },
  },
});
