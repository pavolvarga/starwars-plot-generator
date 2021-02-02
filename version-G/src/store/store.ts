import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ResourceKey } from '@/api/types';
import { InputFormState } from '@/store/types';
import { loadStarWarsData } from '@/api/load-data';
import { getMandatoryResourceNames } from '@/api/api';

// define injection key
export const key: InjectionKey<Store<InputFormState>> = Symbol()

const state: InputFormState = {
  person:   { name: 'person',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Character' },
  planet:   { name: 'planet',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Planet'    },
  starship: { name: 'starship', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Starship'  },
  vehicle:  { name: 'vehicle',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Vehicle'   },
  species:  { name: 'species',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Species'   }
};

const mutations = {
  setData(state: any, { name, data }: any) {
    state[name].data = data;
    state[name].loadingInProgress = false;
    state[name].loadFailed = false;
    state[name].visible = true;
  },
  startLoading(state: any, { name }: any) {
    state[name].loadingInProgress = true;
  },
  confirmLoadFailed(state: any, { name }: any) {
    state[name].loadingInProgress = false;
    state[name].loadFailed = true;
  },
  toggleVisibility(state: any, { name }: any) {
    state[name].visible = !state[name].visible;
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
      name as ResourceKey,
      (data) => {
        context.commit("setData", { name, data });
      },
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
  },
  getVisibleInputs(state: InputFormState) {
    return Object.values(state).filter(s => s.visible);
  }

};

export const store = createStore({
  state,
  getters,
  actions,
  mutations
});
