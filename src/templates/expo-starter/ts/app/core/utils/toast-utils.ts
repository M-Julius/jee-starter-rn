import { I18nOptions } from 'i18n-js/typings';
import Toast from 'react-native-root-toast';
import {translate, TxKeyPath} from '../i18n';
import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';

export default async function showBasicToast({text, tx, txOptions}:{
  text?: string,
  tx?: TxKeyPath,
  txOptions?: I18nOptions,
}) {
  Toast.show(tx ? (translate(tx, txOptions) ?? '') : (text ?? ''), {
    duration: Toast.durations.SHORT,
    keyboardAvoiding: true,
    containerStyle: {backgroundColor: AppColors.black, width: '90%'},
    textColor: AppColors.white,
    textStyle: {...AppStyles.textBold, fontFamily: 'raleway_bold', textAlign: 'left'},
    backgroundColor: AppColors.black,
    opacity: 100,
    animation: true,
  });
}
