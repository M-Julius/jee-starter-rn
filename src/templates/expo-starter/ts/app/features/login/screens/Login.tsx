import React from 'react';
import AppStyles from '~/app/core/static/AppStyles';
import AppText from '~/app/core/component/AppText';
import {Screen} from '~/app/core/component/screen/Screen';
import InputForm from '~/app/core/component/InputForm';
import {useState} from 'react';
import {Alert, View} from 'react-native';
import {AppButton, AppButtonThemes} from '~/app/core/component/AppButton';
import {useStores} from '~/app/core/store';
import Loading from '~/app/core/component/Loading';
import HomeScreens from '../../home/config/Screens';
import {CompositeNavigationProp} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import AppColors from '~/app/core/static/AppColors';
import {useFormik} from 'formik';
import {validationSchemaLogin} from '../config/ValidationShema';

type LoginProps = {
  navigation: CompositeNavigationProp<any, any>;
};
function Login({navigation}: LoginProps) {
  const [loading, setLoading] = useState(false);
  const {userService} = useStores();
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const result = await userService.loginUser(values);
      setLoading(false);
      if (result.isRight) {
        Alert.alert('Berhasil Login', '', [
          {
            text: 'Lanjut',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: HomeScreens.HOME.KEY,
                  },
                ],
              });
            },
          },
        ]);
      } else {
        Alert.alert('Gagal Login', result.left?.message, [
          {text: 'Coba Lagi', onPress: () => {}},
        ]);
      }
    },
    validationSchema: validationSchemaLogin,
  });

  return (
    <Screen style={AppStyles.modalContainer}>
      <AppText style={AppStyles.textH1}>
        Login {process.env?.REACT_APP_NAME}
      </AppText>
      <View style={{width: '90%', marginTop: 50}}>
        <InputForm
          style={{alignSelf: 'stretch', marginTop: 8}}
          placeholder={'Username'}
          error={!!formik.errors.username}
          errorString={formik.errors.username}
          onChangeText={formik.handleChange('username')}
          value={formik.values.username}
          prefix={() => (
            <AntDesign name="user" size={24} color={AppColors.grey_divider} />
          )}
        />
        <InputForm
          style={{alignSelf: 'stretch', marginTop: 8}}
          placeholder={'Password'}
          error={!!formik.errors.password}
          errorString={formik.errors.password}
          onChangeText={formik.handleChange('password')}
          value={formik.values.password}
          secureTextEntry
          prefix={() => (
            <AntDesign name="lock" size={24} color={AppColors.grey_divider} />
          )}
        />
        <AppButton
          btnStyle={AppButtonThemes.filled}
          style={{marginTop: 20}}
          onClick={() => formik.handleSubmit()}>
          Login
        </AppButton>
      </View>
      <Loading visible={loading} />
    </Screen>
  );
}

export default Login;
