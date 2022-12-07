import {CancelToken} from 'apisauce';
import {
  useCallback, useEffect, useState,
} from 'react';
import {extractState} from '../utils/hook-utils';

export type PaginationState<T> = {
  loading: boolean,
  refreshing: boolean,
  refreshGesture: boolean,
  page: number,
  data: T[],
  next: boolean,
};

// eslint-disable-next-line import/prefer-default-export
export function usePagination<T>(
  loadData: (
    state: PaginationState<T>,
    setState: React.Dispatch<React.SetStateAction<PaginationState<T>>>,
    isActive: () => boolean,
    token: any) => any,
  defaultState: PaginationState<T>,
) {
  const [state, setState] = useState(defaultState);
  const next = useCallback(() => {
    setState((prev) => {
      if (prev.refreshing || !prev.next) return prev;
      return {
        ...prev,
        loading: true,
        refreshing: false,
      };
    });
  }, []);
  const reload = useCallback((withGesture: boolean = true, clear: boolean = false) => {
    setState((prev) => ({
      ...prev,
      data: clear ? [] : prev.data,
      loading: !withGesture,
      refreshing: true,
      refreshGesture: withGesture,
    }));
  }, []);
  const callback = useCallback(() => {
    let isActive = true;
    const source = CancelToken.source();
    const runner = async () => {
      const localState = await extractState(setState);
      if (!localState.loading && !localState.refreshing) return;
      loadData(localState, setState, () => isActive, source.token);
    };
    runner();
    return () => {
      isActive = false;
      source.cancel();
    };
  }, [loadData]);
  useEffect(
    callback,
    [callback, state.loading, state.refreshing],
  );
  return {
    state, next, reload, setState,
  };
}
