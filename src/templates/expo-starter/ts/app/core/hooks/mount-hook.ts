import {useEffect} from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useMount(func: () => any) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(func, []);
}
