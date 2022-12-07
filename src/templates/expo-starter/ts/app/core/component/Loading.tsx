import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, BackHandler, View} from 'react-native';
import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';
import AppText from './AppText';

export type LoadingProps = {
  visible: boolean;
};

const Loading = ({visible}: LoadingProps) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      if (visible) BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        if (visible) BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [visible]),
  );
  if (visible) {
    return (
      <View
        pointerEvents="box-only"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{padding: 16, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <ActivityIndicator size="large" color={AppColors.orchid} />
          <AppText style={[
            AppStyles.textButton14,
            {color: AppColors.white, marginTop: 4}]}
          >
            Loading...

          </AppText>
        </View>
      </View>
    );
  }
  return null;
};

export default Loading;
