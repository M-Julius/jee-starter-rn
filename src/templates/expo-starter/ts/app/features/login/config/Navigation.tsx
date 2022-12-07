import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import ScreenTransitions from '~/app/core/component/animations/ScreenTransitions';
import Login from '../screens/Login';
import Screens from './Screens';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.LOGIN.KEY}
      component={Login}
      key={Screens.LOGIN.KEY}
      options={{
        title: Screens.LOGIN.TITLE,
        headerShown: false,
        ...ScreenTransitions.bottomsheet,
      }}
    />,
  ];
}

const LoginNavigation = {
  getNavigation,
};

export default LoginNavigation;
