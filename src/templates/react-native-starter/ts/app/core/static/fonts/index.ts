/* eslint-disable global-require */
import * as Font from 'expo-font';

// eslint-disable-next-line import/prefer-default-export
export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  return await Font.loadAsync({
    raleway: require('../../../../assets/fonts/raleway.ttf'),
    raleway_bold: require('../../../../assets/fonts/raleway_bold.ttf'),
    raleway_italic: require('../../../../assets/fonts/raleway_italic.ttf'),
    raleway_bold_italic: require('../../../../assets/fonts/raleway_bold_italic.ttf'),
  });
};

export const customFonts = {
  raleway: require('../../../../assets/fonts/raleway.ttf'),
  raleway_bold: require('../../../../assets/fonts/raleway_bold.ttf'),
  raleway_italic: require('../../../../assets/fonts/raleway_italic.ttf'),
  raleway_bold_italic: require('../../../../assets/fonts/raleway_bold_italic.ttf'),
};
