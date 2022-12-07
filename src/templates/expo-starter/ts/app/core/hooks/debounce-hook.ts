import {CancelToken} from 'apisauce';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {extractState} from '../utils/hook-utils';

// eslint-disable-next-line import/prefer-default-export
export function useDebounceEffect<T>(
  callback: (props: T, isActive: () => boolean, token: any) => any, time: number,
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
    let timeout: any | undefined;
    const runner = async () => {
      const localData = await extractState(setData);
      if (localData.timestamp > 0) {
        timeout = setTimeout(() => {
          callback(localData.props, () => isActive, source.token);
        }, time);
      }
    };
    runner();
    return () => {
      isActive = false;
      source.cancel();
      if (timeout) clearTimeout(timeout);
    };
  }, [callback, time]);
  useEffect(effectCb, [effectCb, data.timestamp]);
  return trigger;
}
