import {I18n} from 'i18n-js';
import en from './en.json';
import id from './id.json';

const i18n = new I18n({en, id});

// i18n.fallbacks = true;
// i18n.translations = {en, id};

i18n.locale = 'id';

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];
