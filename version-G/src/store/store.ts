import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ResourceKey } from '@/api/types';
import { InputFormState, InputState } from '@/store/types';
import { loadStarWarsData } from '@/api/load-data';

// define injection key
export const key: InjectionKey<Store<InputFormState>> = Symbol();

const initState: InputFormState = {
  person:   { name: 'person',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Character', mandatory: true  },
  planet:   { name: 'planet',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Planet',    mandatory: true  },
  starship: { name: 'starship', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Starship',  mandatory: false },
  vehicle:  { name: 'vehicle',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Vehicle',   mandatory: false },
  species:  { name: 'species',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Species',   mandatory: false }
};
const mandatory = Object.values(initState).filter(v => v.mandatory).map(v => v.name);
const optional  = Object.values(initState).filter(v => !v.mandatory).map(v => v.name);

function getMandatoryInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => mandatory.includes(inputState.name));
}
function getOptionalInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => optional.includes(inputState.name));
}

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
  isMandatoryDataLoaded(formState: InputFormState) {
    return getMandatoryInputs(formState).every(inputState => !inputState.loadFailed && !inputState.loadingInProgress);
  },
  hasLoadingOfMandatoryDataFailed(formState: InputFormState) {
    return getMandatoryInputs(formState).some(inputState => inputState.loadFailed);
  },
  getVisibleInputs(formState: InputFormState) {
    return Object.values(formState).filter(s => s.visible);
  },
  getOptionalInputs(formState: InputFormState) {
    return getOptionalInputs(formState);
  },
  isInputVisible(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].visible;
    }
  },
  areMandatoryInputSelected(formState: InputFormState) {
    return getMandatoryInputs(formState).every(inputState => inputState.selected);
  }

};

export const store = createStore({
  state: initState,
  getters,
  actions,
  mutations
});
