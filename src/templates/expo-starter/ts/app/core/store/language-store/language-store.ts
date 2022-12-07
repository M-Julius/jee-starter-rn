import {Instance, SnapshotOut, types} from 'mobx-state-tree';

export const LanguageStoreModel = types
  .model('LanguageStore')
  .props({
    lang: types.maybe(types.enumeration(['en', 'id'])),
    lang_positive: types.maybeNull(types.enumeration(['positive_en', 'positive_id'])),
    name: types.maybe(types.string),
  })
  .actions((self) => ({
    switchLang: (lang: 'en' | 'id') => {
      self.lang = lang;
      self.lang_positive = `positive_${lang}`;
    },
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

type LanguageStoreType = Instance<typeof LanguageStoreModel>;
export interface LanguageStore extends LanguageStoreType {}
type LanguageStoreSnapshotType = SnapshotOut<typeof LanguageStoreModel>;
export interface LanguageStoreSnapshot extends LanguageStoreSnapshotType {}
export const createLanguageStoreDefaultModel = () => types.optional(LanguageStoreModel, {});
