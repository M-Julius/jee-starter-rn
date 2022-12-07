import ScreenData from '~/app/core/class/ScreenData';
import AuthScreenProps from './ScreenProps';

const LoginScreens = {
    LOGIN: new ScreenData<AuthScreenProps['Login']>({
      KEY: 'Login',
      TITLE: 'Login',
    }),
}

export default LoginScreens