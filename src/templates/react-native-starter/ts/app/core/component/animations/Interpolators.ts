import {StackCardInterpolatedStyle, StackCardInterpolationProps} from '@react-navigation/stack';

function forFade({
  current: {progress},
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  return {
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  };
}

export default {
  forFade,
};
