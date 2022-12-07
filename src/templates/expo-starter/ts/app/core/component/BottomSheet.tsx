import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Pressable, Animated, StyleSheet, Dimensions, PanResponder, View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';

const styles = StyleSheet.create({
  notch: {
    marginTop: 8,
    marginBottom: 8,
    height: 4,
    borderRadius: 8,
    width: 40,
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
  },
});

export default function BottomSheet({children}: {children: React.ReactNode}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 0,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleDismiss = () => closeAnim.start(() => navigation.goBack());

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy >= 0) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.bottomsheetContainer]}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={[AppStyles.bottomsheetContent, {
          flex: 0,
          transform: [{translateY}],
        }]}
        {...panResponders.panHandlers}
      >
        <View style={styles.notch} />
        {children}
        <SafeAreaView edges={['bottom']} style={{backgroundColor: AppColors.white}} />
      </Animated.View>
    </SafeAreaView>
  );
}
