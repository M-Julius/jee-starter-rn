import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '~/app/core/component/SplashScreen';
import LoginNavigation from '~/app/features/login/config/Navigation';

const Root = createStackNavigator();

function getScreens() {
  return [...LoginNavigation.getNavigation(Root)];
}

function RootNavigation() {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  if (isSplash) {
    return <SplashScreen />;
  }

  return <Root.Navigator>{getScreens()}</Root.Navigator>;
}

export default RootNavigation;
