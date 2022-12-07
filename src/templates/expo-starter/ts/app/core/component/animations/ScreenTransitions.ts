import {TransitionPresets} from '@react-navigation/stack';
import CardOverlay from './CardOverlay';
import Interpolators from './Interpolators';
import {FadeIn, FadeOut} from './TransitionSpecs';

export default {
  modal: {
    presentation: 'transparentModal',
    gestureDirection: 'vertical',
    transitionSpec: {
      open: FadeIn,
      close: FadeOut,
    },
    cardStyleInterpolator: Interpolators.forFade,
    headerStyleInterpolator: Interpolators.forFade,
    cardOverlayEnabled: true,
    cardOverlay: CardOverlay,
  },
  bottomsheet: {
    ...TransitionPresets.BottomSheetAndroid,
    presentation: 'transparentModal',
    cardOverlayEnabled: true,
    cardOverlay: CardOverlay,
  },
};
