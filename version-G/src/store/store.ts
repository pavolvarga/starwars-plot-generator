import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ResourceKey, Suggestion } from '@/api/types';
import { InputFormState } from '@/store/types';
import {loadStarWarsData} from '@/api/load-data';
import {getMandatoryResourceNames, getPluralName} from '@/api/api';

// define injection key
export const key: InjectionKey<Store<InputFormState>> = Symbol()

const state: InputFormState = {
  person: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
  planet: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
  starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
  vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
  species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

const mutations = {
  setData(state: any, { name, data }: any) {
    state[name].data = data;
    state[name].loadingInProgress = false;
    state[name].loadFailed = false;
  },
  startLoading(state: any, { name }: any) {
    state[name].loadingInProgress = true;
  },
  confirmLoadFailed(state: any, { name }: any) {
    state[name].loadingInProgress = false;
    state[name].loadFailed = true;
  }
};

const actions = {
  loadMandatoryResources(context: any) {
    const mandatory = getMandatoryResourceNames();
    mandatory.forEach(name => context.commit("startLoading", { name }));
    mandatory.forEach(name => context.dispatch("loadResource", { name }));
  },
  loadResource(context: any, payload: any) {
    const { name } = payload;
    loadStarWarsData(
      getPluralName(name),
      (data) => context.commit("setData", { name, data }),
      (err) => {
        console.log(name, err);
        context.commit("confirmLoadFailed", { name });
      }
    );
  }
};

const getters = {
  isMandatoryDataLoaded(state: InputFormState) {
    return getMandatoryResourceNames().every(name => !state[name].loadFailed && !state[name].loadingInProgress);
  },
  hasLoadingOfMandatoryDataFailed(state: InputFormState) {
    return getMandatoryResourceNames().some(name => state[name].loadFailed);
  }
};

export const store = createStore({
  state,
  getters,
  actions,
  mutations
});
