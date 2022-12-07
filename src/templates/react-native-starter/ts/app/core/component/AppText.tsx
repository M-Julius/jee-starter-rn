import I18n from 'i18n-js';
import React, {useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {TxKeyPath} from '../i18n/i18n';
import {translate} from '../i18n';

type AppTextProps = TextProps & {
  children?: React.ReactNode
  font?: 'raleway',
  italic?: boolean,
  bold?: boolean,
  tx?: TxKeyPath,
  txOptions?: I18n.TranslateOptions,
};

export default function AppText({
  style, font, italic, bold, children, tx, txOptions, ...props
}: AppTextProps) {
  useIsFocused();
  const i18nText = tx && translate(tx, txOptions);
  const content = useMemo(() => i18nText || children, [i18nText, children]);

  const flatStyle = useMemo(() => {
    const {fontWeight, ...values} = StyleSheet.flatten(style ?? {});
    return {fontWeight, values};
  }, [style]);

  const family = useMemo(() => {
    const styleBold = flatStyle.fontWeight === 'bold';
    return `${font}${(bold || styleBold) ? '_bold' : ''}${italic ? '_italic' : ''}`;
  }, [flatStyle.fontWeight, font, bold, italic]);

  return (<Text style={[{fontFamily: family}, flatStyle.values, {fontVariant: ['lining-nums']}]} {...props}>{content}</Text>);
}

AppText.defaultProps = {
  font: 'raleway',
  italic: false,
  bold: false,
  tx: '',
  txOptions: {},
  children: '',
};
