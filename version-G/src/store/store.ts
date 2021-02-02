import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ResourceKey } from '@/api/types';
import { InputFormState, InputState } from '@/store/types';
import {loadStarWarsData, ResourceData} from '@/api/load-data';

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
  setData(formState: InputFormState, { name, data }: any) {
    formState[name as ResourceKey].data = data;
  },
  setLoadingInProgress(formState: InputFormState, { name, loadingInProgress }: any) {
    formState[name as ResourceKey].loadingInProgress = loadingInProgress;
  },
  setVisibility(formState: InputFormState, { name, visibility }: any) {
    formState[name as ResourceKey].visible = visibility;
  },
  setLoadFailed(formState: InputFormState, { name, loadFailed }: any) {
    formState[name as ResourceKey].loadFailed = loadFailed;
  },
};

const actions = {
  loadMandatoryResources(context: any) {
    mandatory.forEach(name => context.dispatch("loadResource", { name }));
  },
  loadResource(context: any, payload: any) {
    const { name } = payload;
    function resolve(data: ResourceData[]) {
      context.commit("setData", { name, data });
      context.commit("setVisibility", { name, visibility: true });
      context.commit("setLoadingInProgress", { name, loadingInProgress: false });
      context.commit("setLoadFailed", { name, loadFailed: false });
    }
    function reject(err: Error) {
      console.log(name, err);
      context.commit("setLoadingInProgress", { name, loadingInProgress: false });
      context.commit("setLoadFailed", { name, loadFailed: true });
    }
    context.commit("setLoadingInProgress", { name, loadingInProgress: true });
    loadStarWarsData(name as ResourceKey, resolve, reject);
  },
  toggleVisibility(context: any, payload: any) {
    const { name } = payload;
    const visible = context.state[name].visible;
    context.commit("setVisibility", { name, visibility: !visible });
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
  areMandatoryInputSelected(formState: InputFormState) {
    return getMandatoryInputs(formState).every(inputState => inputState.selected);
  },
  isInputVisible(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].visible;
    }
  },
  isInputDataLoaded(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].data.length > 0;
    }
  }
};

export const store = createStore({
  state: initState,
  getters,
  actions,
  mutations
});
