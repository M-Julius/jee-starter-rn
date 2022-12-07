import {UserService} from '../../services/user-service/user-service';
import {LanguageStore} from '../language-store/language-store';
import {UserStore} from '../user-store/user-store';

export type RootStore = {
  languageStore: LanguageStore,
  userService: UserService,
  userStores: UserStore,
};
