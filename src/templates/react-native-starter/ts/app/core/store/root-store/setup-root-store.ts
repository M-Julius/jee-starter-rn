import {onSnapshot} from 'mobx-state-tree';
import I18n from 'i18n-js';
import {RootStoreModel, RootStore} from './root-store';
import storage from '../../utils/storage';
import {setupEnvironment} from '../environment';

const ROOT_STATE_STORAGE_KEY = 'root';

/**
 * Setup the root state.
 */
// eslint-disable-next-line import/prefer-default-export
export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;

  // prepare the environment that will be associated with the RootStore.
  const env = await setupEnvironment();
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env);
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot));


  return rootStore;
}
