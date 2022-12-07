import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  notch: {
    marginTop: 8,
    marginBottom: 8,
    height: 4,
    borderRadius: 8,
    width: 40,
    backgroundColor: '#f1f1f1',
  },
});

export default function BottomsheetNotch({pressable}:{pressable?: boolean}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={pressable ? navigation.goBack : undefined}
    >
      <View style={styles.notch} />
    </Pressable>
  );
}

BottomsheetNotch.defaultProps = {
  pressable: true,
};
