import {useStores} from '../store';

// eslint-disable-next-line import/prefer-default-export
export function useLanguageObserver() {
  const {languageStore} = useStores();
  const currentLang = languageStore.lang;
  return currentLang;
}
