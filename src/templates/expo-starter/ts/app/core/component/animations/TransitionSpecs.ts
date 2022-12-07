import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {Easing} from 'react-native-reanimated';

export const FadeIn: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.out(Easing.poly(5)),
  },
};

/**
 * Configuration for activity close animation from Android Nougat.
 * See http://aosp.opersys.com/xref/android-7.1.2_r37/xref/frameworks/base/core/res/res/anim/activity_close_exit.xml
 */
export const FadeOut: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: Easing.in(Easing.linear),
  },
};
