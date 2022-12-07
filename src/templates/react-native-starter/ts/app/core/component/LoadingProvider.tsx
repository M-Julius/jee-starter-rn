import React from 'react';

import {NativeSafeAreaViewProps} from 'react-native-safe-area-context';
import Loading, {LoadingProps} from './Loading';
import ToggleableSafeArea from './ToggleableSafeArea';

type LoadingProviderProps = NativeSafeAreaViewProps & LoadingProps & {
  withSafeArea?: boolean;
  children?: React.ReactNode;
};

const LoadingProvider = ({
  visible, withSafeArea, children, ...props
}: LoadingProviderProps) => (
  <ToggleableSafeArea active={withSafeArea!} {...props}>
    {children}
    <Loading visible={visible} />
  </ToggleableSafeArea>
);

LoadingProvider.defaultProps = {
  withSafeArea: false,
  children: undefined,
};

export default LoadingProvider;
