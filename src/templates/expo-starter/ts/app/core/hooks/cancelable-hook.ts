import {useFocusEffect} from '@react-navigation/native';
import {CancelToken} from 'apisauce';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {extractState} from '../utils/hook-utils';

export function useCancelable(
  func: (isActive: () => boolean, source: any) => any,
) {
  return useCallback(
    () => {
      const source = CancelToken.source();
      let isActive = true;
      func(() => isActive, source.token);
      return () => {
        isActive = false;
        source.cancel();
      };
    },
    [func],
  );
}

export function useCancelableEffect(
  func: (isActive: () => boolean, source: any) => any, deps: any,
) {
  const effectCb = useCancelable(func);
  useEffect(effectCb, [effectCb, ...deps]);
}

export function useCancelableFocusEffect(
  func: (isActive: () => boolean, source: any) => any,
) {
  useFocusEffect(useCancelable(func));
}

export function useCancelableFn<T>(
  callback: (props: T, isActive: () => boolean, token: any) => any,
) {
  const [data, setData] = useState({
    timestamp: 0,
    props: {} as T,
  });
  const trigger = useMemo(() => {
    const triggerFn = (props: T) => setData({
      timestamp: Date.now(),
      props,
    });
    return triggerFn;
  }, []);
  const effectCb = useCallback(() => {
    let isActive = true;
    const source = CancelToken.source();
    const runner = async () => {
      const localData = await extractState(setData);
      if (localData.timestamp > 0) {
        callback(localData.props, () => isActive, source.token);
      }
    };
    runner();
    return () => {
      isActive = false;
      source.cancel();
    };
  }, [callback]);
  useEffect(effectCb, [effectCb, data.timestamp]);
  return trigger;
}
