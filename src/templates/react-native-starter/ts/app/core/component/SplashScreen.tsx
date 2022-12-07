import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppColors from '~/app/core/static/AppColors';
import AppStyles from '~/app/core/static/AppStyles';
import AppText from './AppText';
import {Screen} from './screen/Screen';

export default function SplashScreen() {
  return (
    <SafeAreaProvider>
      <Screen
        style={[AppStyles.modalContainer, {backgroundColor: AppColors.white}]}>
        <AppText style={[AppStyles.textH2, {color: AppColors.orchid}]}>
          {process.env.REACT_APP_NAME}
        </AppText>
      </Screen>
    </SafeAreaProvider>
  );
}
