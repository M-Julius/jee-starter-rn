import React from 'react';
import {Image, View} from 'react-native';
import {assets} from '../assets';
import AppText from './AppText';

const NodData = () => {
  return (
    <View style={{alignItems: 'center', alignSelf: 'center', marginTop: '40%'}}>
      <Image
        source={assets.img.no_data}
        style={{width: 200, height: 200, resizeMode: 'contain'}}
      />
      <AppText>Tidak ada data</AppText>
    </View>
  );
};

export default NodData;
