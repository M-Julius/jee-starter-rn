import React, {useMemo} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';

import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';
import AppText from './AppText';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderColor: '#D8DADD',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    ...AppStyles.textBody16,
    fontVariant: ['lining-nums'],
    padding: 0,
    flex: 1,
    lineHeight: Platform.OS === 'ios' ? 0 : 22,
  },
  title: {
    ...AppStyles.textSmall,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  error: {
    color: AppColors.red,
    borderColor: AppColors.red,
  },
  placeholder: {
    color: AppColors.grey,
  },
});

type InputFormExtraProps = {
  inputStyle: StyleProp<ViewStyle | TextStyle>;
  errorStyle: StyleProp<ViewStyle | TextStyle>;
};

type InputProps = {
  error: boolean;
  placeholder: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  readonly?: boolean;
  font?: 'raleway';
  italic?: boolean;
  bold?: boolean;
  value: string;
  onSubmitEditing?: () => void;
};

type InputFormProps = InputProps & {
  style: StyleProp<ViewStyle | TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  prefix?: (props: InputFormExtraProps) => JSX.Element;
  suffix?: (props: InputFormExtraProps) => JSX.Element;
  errorString?: string;
  onPress?: () => void;
};

const Input = ({
  placeholder,
  error,
  readonly,
  font,
  italic,
  bold,
  maxLength,
  secureTextEntry,
  keyboardType,
  onChangeText,
  value,
  onSubmitEditing,
}: InputProps) => {
  const family = useMemo(
    () => `${font}${bold ? '_bold' : ''}${italic ? '_italic' : ''}`,
    [font, italic, bold],
  );
  if (readonly) {
    return (
      <AppText
        style={[
          styles.input,
          value.length === 0 && styles.placeholder,
          value.length > 0 && error && styles.error,
        ]}>
        {value.length === 0 ? placeholder : value}
      </AppText>
    );
  }
  return (
    <TextInput
      style={[{fontFamily: family}, styles.input, error && styles.error]}
      placeholderTextColor={AppColors.grey}
      placeholder={placeholder}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default function InputForm({
  style,
  containerStyle,
  prefix,
  suffix,
  error,
  errorString,
  onPress,
  ...props
}: InputFormProps) {
  const Prefix = prefix!;
  const Suffix = suffix!;

  const content = () => {
    return (
      <>
        <View
          style={[
            styles.inputContainer,
            error && styles.error,
            containerStyle,
          ]}>
          <Prefix
            inputStyle={[AppStyles.textBody16, {fontVariant: ['lining-nums']}]}
            errorStyle={error && styles.error}
          />
          <Input error={error} {...props} />
          <Suffix
            inputStyle={[AppStyles.textBody16, {fontVariant: ['lining-nums']}]}
            errorStyle={error && styles.error}
          />
        </View>
        <AppText style={[AppStyles.textXs, error && styles.error]}>
          {errorString}
        </AppText>
      </>
    );
  };

  if (props.readonly) {
    return (
      <Pressable style={style} onPress={onPress}>
        {content()}
      </Pressable>
    );
  }

  return <View style={style}>{content()}</View>;
}

const defaultProps = {
  secureTextEntry: false,
  keyboardType: 'default',
  maxLength: undefined,
  readonly: false,
  onChangeText: () => null,
  font: 'raleway',
  italic: false,
  bold: false,
  onSubmitEditing: () => null,
};

Input.defaultProps = defaultProps;
InputForm.defaultProps = {
  ...defaultProps,
  prefix: () => <View />,
  suffix: () => <View />,
  errorString: '',
  containerStyle: undefined,
};
