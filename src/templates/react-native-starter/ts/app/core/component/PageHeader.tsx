import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {ColorValue, Pressable, View, ViewStyle} from 'react-native';
import {NativeSafeAreaViewProps} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppColors from '../static/AppColors';
import AppStyles from '../static/AppStyles';
import ToggleableSafeArea from './ToggleableSafeArea';
import Visible from './Visible';
import AppText from './AppText';

type PageHeaderProps = NativeSafeAreaViewProps & {
  withBack?: boolean;
  withSafeArea?: boolean;
  withBorder?: boolean;
  children?: React.ReactNode;
  background?: ColorValue;
  headerTheme?: 'light' | 'dark';
  backStyle?: ViewStyle;
  onBack?: () => void | null;
  iconColor?: string;
  title?: string;
};

export default function PageHeader({
  withBack = true,
  withSafeArea,
  withBorder,
  children,
  headerTheme,
  background,
  style,
  backStyle,
  onBack,
  iconColor,
  title,
  ...props
}: PageHeaderProps) {
  const navigation = useNavigation();
  const theme = useMemo(
    () => ({
      background: headerTheme === 'light' ? AppColors.white : AppColors.black,
      icon: AppColors.orchid,
    }),
    [headerTheme],
  );
  return (
    <ToggleableSafeArea
      edges={['top']}
      style={[
        withBorder ? AppStyles.headerBorderBottom : {},
        {backgroundColor: background ?? theme.background},
        style,
      ]}
      active={withSafeArea!}
      {...props}>
      <View style={AppStyles.appbar}>
        <Visible visible={true}>
          <Pressable style={backStyle} onPress={onBack || navigation.goBack}>
            <AntDesign
              name={'arrowleft'}
              color={iconColor || theme.icon}
              size={24}
            />
            
          </Pressable>
        </Visible>
        <AppText style={[AppStyles.textBody18, {marginLeft: 20}]}>
          {title}
        </AppText>
        {children}
      </View>
    </ToggleableSafeArea>
  );
}

PageHeader.defaultProps = {
  withBack: false,
  withSafeArea: false,
  withBorder: false,
  children: null,
  background: undefined,
  headerTheme: 'light',
  backStyle: {},
  onBack: null,
  iconColor: '',
};
