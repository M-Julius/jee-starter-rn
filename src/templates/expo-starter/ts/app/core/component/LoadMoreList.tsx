import React from 'react';

import {FlatList, FlatListProps} from 'react-native';

type LoadMoreListProp = {
  renderLoadMore: () => JSX.Element,
  onLoadMore: () => any,
  loading: boolean,
};

function handleLoadMore(
  loading: boolean,
  renderLoadMore: () => JSX.Element,
) {
  if (loading) {
    return renderLoadMore();
  }
  return null;
}

export default function LoadMoreList({
  loading, renderLoadMore, onLoadMore, ...props
}: FlatListProps<any> & LoadMoreListProp) {
  return (
    <FlatList
      ListFooterComponent={() => handleLoadMore(loading, renderLoadMore)}
      onEndReachedThreshold={0.4}
      onEndReached={onLoadMore}
      {...props}
    />
  );
}
