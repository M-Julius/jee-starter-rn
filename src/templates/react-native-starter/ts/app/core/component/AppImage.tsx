import React, {useMemo, useState} from 'react';
import {
  ImageStyle,
  StyleProp, View, ViewStyle, Image, ImageProps, StyleSheet, ActivityIndicator,
} from 'react-native';
import AppColors from '../static/AppColors';
import Visible from './Visible';

const styles = StyleSheet.create({
  fullCover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type AppImageProps = ImageProps & {
  containerStyle?: StyleProp<ViewStyle & ImageStyle>;
};

export default function AppImage({style, ...props}: AppImageProps) {
  const [loading, setLoading] = useState(false);
  const resizeMode = useMemo(() => StyleSheet
    .flatten(style ?? {}).resizeMode ?? undefined, [style]);
  return (
    <View style={[{overflow: 'hidden'}, style]}>
      <Image
        onLoadEnd={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
        style={[styles.fullCover, {resizeMode}]}
        {...props}
      />
      <Visible visible={loading}>
        <View style={styles.fullCover}>
          <ActivityIndicator size="large" color={AppColors.orchid} />
        </View>
      </Visible>
    </View>
  );
}

AppImage.defaultProps = {
  containerStyle: {},
};
