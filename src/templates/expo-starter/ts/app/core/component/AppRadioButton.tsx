import React from 'react';
import {Pressable} from 'react-native';
import AppColors from '../static/AppColors';

type AppRadioButtonProps = {
  value?: boolean,
  onPress?: () => void,
  size?: number,
  widthActive?: number,
  widthNotActive?: number
};

function AppRadioButton({
  value, onPress, size, widthActive, widthNotActive,
} :AppRadioButtonProps) {
  return (
    <Pressable
      style={{
        width: size,
        height: size,
        borderRadius: size,
        borderWidth: value ? widthActive : widthNotActive,
        borderColor: value ? AppColors.orchid : AppColors.grey,
      }}
      onPress={onPress}
    />
  );
}

AppRadioButton.defaultProps = {
  widthActive: 6,
  widthNotActive: 2,
  value: false,
  onPress: () => null,
  size: 20,
};

export default AppRadioButton;
