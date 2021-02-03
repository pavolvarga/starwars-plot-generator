import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import {ResourceKey, Suggestion} from '@/api/types';
import { InputFormState, InputState } from '@/store/types';
import {loadStarWarsData, ResourceData} from '@/api/load-data';

/**
 * Time after it is possible again trying to load optional resource data
 */
const COOL_DOWN = 5000;

// define injection key
export const key: InjectionKey<Store<InputFormState>> = Symbol();

const initState: InputFormState = {
  person:   { name: 'person',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Character', mandatory: true  },
  planet:   { name: 'planet',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Planet',    mandatory: true  },
  starship: { name: 'starship', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Starship',  mandatory: false },
  vehicle:  { name: 'vehicle',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Vehicle',   mandatory: false },
  species:  { name: 'species',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Species',   mandatory: false }
};
const mandatory = Object.values(initState).filter(v => v.mandatory).map(v => v.name as ResourceKey);
const optional  = Object.values(initState).filter(v => !v.mandatory).map(v => v.name as ResourceKey);

function getMandatoryInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => mandatory.includes(inputState.name as ResourceKey));
}
function getOptionalInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => optional.includes(inputState.name as ResourceKey));
}

type Payload = {
  name: ResourceKey;
};
type MutationPayload = Payload & Partial<Pick<InputState, 'data' | 'loadingInProgress' | 'visible' | 'loadFailed' | 'selected'>>;

const mutations = {
  setData(formState: InputFormState, payload: MutationPayload) {
    const { name, data } = payload;
    formState[name].data = data!;
  },
  setLoadingInProgress(formState: InputFormState, payload: MutationPayload) {
    const { name, loadingInProgress } = payload;
    formState[name].loadingInProgress = loadingInProgress!;
  },
  setVisible(formState: InputFormState, payload: MutationPayload) {
    const { name, visible } = payload;
    formState[name].visible = visible!;
  },
  setLoadFailed(formState: InputFormState, payload: MutationPayload) {
    const { name, loadFailed } = payload;
    formState[name].loadFailed = loadFailed!;
  },
  setSelected(formState: InputFormState, payload: MutationPayload) {
    const { name, selected } = payload;
    formState[name].selected = selected;
  }
};

const actions = {
  loadMandatoryResources(context: any) {
    mandatory.forEach(name => {
      // if data were once loaded, do not load them again
      if (context.state[name].data.length === 0) {
        context.dispatch("loadResource", { name, visible: false })
      }
    });
  },
  loadResource(context: any, payload: Payload) {
    const { name } = payload;
    function resolve(data: ResourceData[]) {
      context.commit("setData", { name, data });
      context.commit("setVisible", { name, visible: true });
      context.commit("setLoadingInProgress", { name, loadingInProgress: false });
      context.commit("setLoadFailed", { name, loadFailed: false });
    }
    function reject(err: Error) {
      console.error(name, err);
      context.commit("setLoadingInProgress", { name, loadingInProgress: false });
      context.commit("setLoadFailed", { name, loadFailed: true });
      setTimeout(() => {
        context.dispatch("resetLoadFailure", { name });
      }, COOL_DOWN);
    }
    context.commit("setLoadingInProgress", { name, loadingInProgress: true });
    loadStarWarsData(name as ResourceKey, resolve, reject);
  },
  toggleVisibility(context: any, payload: Payload) {
    const { name } = payload;
    const visible = context.state[name].visible;
    context.commit("setVisible", { name, visible: !visible });
  },
  setVisibility(context: any, payload: Payload & { visible: boolean }) {
    const { name, visible } = payload;
    context.commit("setVisible", { name, visible: visible });
  },
  selectValue(context: any, payload: Payload & { selected: Suggestion | undefined }) {
    const { name, selected } = payload;
    context.commit("setSelected", { name, selected });
  },
  resetLoadFailure(context: any, payload: Payload) {
    const { name } = payload;
    context.commit("setLoadingInProgress", { name, loadingInProgress: false });
    context.commit("setLoadFailed", { name, loadFailed: false });
    context.commit("setVisible", { name, visible: false });
  },
  resetSelected(context: any) {
    Object
      .values(context.state as InputState[])
      .map((inputState: InputState) => inputState.name)
      .forEach(name => {
        context.commit("setSelected", { name, suggestion: undefined });
      });
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
    return Object.values(formState).filter(inputState => inputState.visible);
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
  },
  isLoadingInProgress(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].loadingInProgress;
    }
  },
  hasLoadFailed(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].loadFailed;
    }
  },
  getFailedOptionalInputNames(formState: InputFormState) {
    return getOptionalInputs(formState)
      .filter(inputState => inputState.loadFailed)
      .map(inputState => inputState.name);
  },
  getSelected(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].selected;
    }
  },
  getLabel(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].label;
    }
  },
  getData(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].data;
    }
  }
};

export const store = createStore({
  state: initState,
  getters,
  actions,
  mutations
});
