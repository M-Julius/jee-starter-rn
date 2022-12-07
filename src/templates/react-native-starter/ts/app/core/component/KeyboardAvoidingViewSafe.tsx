import React from 'react';
import {KeyboardAvoidingView, KeyboardAvoidingViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type KeyboardAvoidingViewSafeProps = KeyboardAvoidingViewProps & {
  children?: React.ReactNode;
};

export default function KeyboardAvoidingViewSafe(
  {
    children, style, ...props
  }:KeyboardAvoidingViewSafeProps,
) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={-insets.bottom} style={style} {...props}>
      {children}
    </KeyboardAvoidingView>
  );
}
