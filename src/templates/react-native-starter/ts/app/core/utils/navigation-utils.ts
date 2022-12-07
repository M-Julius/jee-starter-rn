import {
  CommonActions,
  NavigationState,
} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import LoginScreens from '~/app/features/login/config/Screens';
import storage from './storage';

let _navigator: any;

/**
 * Custom hook for persisting navigation state.
 */
// eslint-disable-next-line import/prefer-default-export
export function useNavigationPersistence(persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestoringNavigationState, setIsRestoringNavigationState] =
    useState(true);

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  const restoreState = useCallback(async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestoringNavigationState(false);
    }
  }, [persistenceKey]);

  useEffect(() => {
    if (isRestoringNavigationState) restoreState();
  }, [isRestoringNavigationState, restoreState]);

  return {onNavigationStateChange, restoreState, initialNavigationState};
}

export function setTopLevelNavigation(ref: any) {
  _navigator = ref;
}

export function resetNavigation() {
  _navigator?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: LoginScreens.LOGIN.KEY}],
    }),
  ) ?? null;
}
