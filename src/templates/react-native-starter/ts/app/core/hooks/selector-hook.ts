import {Mutex} from 'async-mutex';
import React, {useEffect, useMemo, useState} from 'react';

type Listener<T, R> = (data: T | undefined) => R;
type CachedListener<T, R> = {
  value: R,
  listener: Listener<T, R>
};

function createSelectorContext<T>(
  initial: T, forceUpdate: React.Dispatch<React.SetStateAction<number>>,
) {
  const mutex = new Mutex();
  const data = {
    data: initial,
    listeners: [] as CachedListener<T, any>[],
  };
  const setListener = <R> (listener: Listener<T, R>) => {
    const cached = {
      value: listener(data.data),
      listener,
    } as CachedListener<T, R>;
    data.listeners.push(cached);
    return () => {
      mutex.runExclusive(() => {
        data.listeners = data.listeners.filter((l) => l !== cached);
      });
    };
  };
  const useHook = <R> (listener: Listener<T, R>): R => {
    useEffect(() => setListener(listener), [listener]);
    return listener(data.data);
  };
  const updateDispatcher = (newData: T) => {
    data.data = newData;
    let changed = false;
    data.listeners.forEach((l) => {
      const res = l.listener(data.data);
      if (res !== l.listener) {
        l.value = res;
        changed = true;
      }
    });
    if (changed) forceUpdate((v) => v + 1);
  };
  const update = (newData: React.SetStateAction<T>) => {
    mutex.runExclusive(() => {
      if (typeof newData !== 'function') {
        updateDispatcher(newData);
      } else {
        const newDataCall = newData as (prevState: T) => T;
        const newVal = newDataCall(data.data as T);
        if (data.data !== newVal) updateDispatcher(newVal);
      }
    });
  };

  return {data, useHook, update};
}

// eslint-disable-next-line import/prefer-default-export
export function useSelectorContext<T>(initial: T):
[
  T,
  <R>(listener: Listener<T, R>) => R,
  React.Dispatch<React.SetStateAction<T>>,
] {
  const [, forceUpdate] = useState(0);
  const {data, useHook, update} = useMemo(() => createSelectorContext<T>(
    initial, forceUpdate,
  // only to init
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);
  return [data.data as T, useHook, update];
}
