import React from 'react';
import {
  StyleSheet, TouchableOpacity, GestureResponderEvent, ViewStyle,
  TextStyle, ImageStyle,
} from 'react-native';
import {TxKeyPath} from '../i18n';
import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';
import AppText from './AppText';

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type AppButtonStyleProps = {
  button?: ViewStyle | TextStyle | ImageStyle,
  text?: ViewStyle | TextStyle | ImageStyle,
  disabledButton?: ViewStyle | TextStyle | ImageStyle,
  disabledText?: ViewStyle | TextStyle | ImageStyle,
};

export const AppButtonThemes = {
  light: {
    button: {
      backgroundColor: '#FFF',
    },
    text: {
      textAlign: 'center',
      color: AppColors.orchid,
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  outline: {
    button: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: AppColors.orchid,
    },
    disabledButton: {
      borderColor: AppColors.medium_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  filled: {
    button: {
      backgroundColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: '#FFF',
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  filled_teal: {
    button: {
      backgroundColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: '#FFF',
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  danger: {
    button: {
      backgroundColor: AppColors.red,
    },
    text: {
      textAlign: 'center',
      color: '#FFF',
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  outline_light: {
    button: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: AppColors.grey,
    },
    text: {
      textAlign: 'center',
      color: AppColors.medium_grey,
    },
    disabledButton: {
      borderColor: AppColors.medium_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  outline_magenta: {
    button: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: AppColors.magenta,
    },
    disabledButton: {
      borderColor: AppColors.medium_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
};

type AppButtonProps = {
  children?: React.ReactNode;
  style?: ViewStyle,
  btnStyle?: AppButtonStyleProps;
  onClick?: (event: GestureResponderEvent) => void;
  enabled?: boolean;
  textStyle?: TextStyle
  tx?: TxKeyPath,
};

export function AppButton({
  children, style, btnStyle, enabled, onClick, textStyle, tx,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={enabled ? onClick : undefined}
      style={[
        styles.button,
        btnStyle?.button ?? {},
        enabled ? {} : (btnStyle?.disabledButton ?? {}),
        style]}
      activeOpacity={enabled ? 0.8 : 1.0}
    >
      <AppText
        style={[
          AppStyles.textButton16,
          btnStyle?.text ?? {},
          enabled ? {} : (btnStyle?.disabledText ?? {}),
          textStyle,
        ]}
        tx={tx}
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
}

AppButton.defaultProps = {
  style: {},
  btnStyle: AppButtonThemes.light,
  onClick: () => null,
  enabled: true,
  textStyle: {},
  tx: '',
  children: '',
};
