import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ModalProvider} from 'react-native-use-modal';
import RootNavigation from './config/RootNavigation';
import {RootStore, RootStoreProvider, setupRootStore} from './store';
import {setTopLevelNavigation, useNavigationPersistence} from './utils/navigation-utils';

const NAVIGATION_PERSISTENCE_KEY = '@root_nav_state';

export default function App() {
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(
    undefined,
  );
  const {initialNavigationState, onNavigationStateChange} =
    useNavigationPersistence(NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore as RootStore}>
      <NavigationContainer
        ref={ref => setTopLevelNavigation(ref)}
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
      >
        {/* 
        // @ts-ignore */}
        <ModalProvider>
            <RootNavigation />
        </ModalProvider>
      </NavigationContainer>
    </RootStoreProvider>
  );
}
