import {ParamListBase} from '@react-navigation/native';

type LoginScreenProps = ParamListBase & {
  Login: {
    type: 'email'
    data: string
  }
};

export default LoginScreenProps;
