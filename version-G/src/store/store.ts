import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ResourceKey } from '@/api/types';
import { InputFormState, InputState } from '@/store/types';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';
import { mutations } from '@/store/mutations';

/**
 * Time after it is possible again trying to load optional resource data
 */
export const COOL_DOWN = 5000;

// define injection key
export const key: InjectionKey<Store<InputFormState>> = Symbol();

const initState: InputFormState = {
  person:   { name: 'person',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Character', mandatory: true  },
  planet:   { name: 'planet',   visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Planet',    mandatory: true  },
  starship: { name: 'starship', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Starship',  mandatory: false },
  vehicle:  { name: 'vehicle',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Vehicle',   mandatory: false },
  species:  { name: 'species',  visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, label: 'Species',   mandatory: false }
};

export const mandatory = Object.values(initState).filter(v => v.mandatory).map(v => v.name as ResourceKey);
export const optional  = Object.values(initState).filter(v => !v.mandatory).map(v => v.name as ResourceKey);

export function getMandatoryInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => mandatory.includes(inputState.name as ResourceKey));
}
export function getOptionalInputs(inputFormState: InputFormState): InputState[] {
  return Object.values(inputFormState).filter(inputState => optional.includes(inputState.name as ResourceKey));
}

export const store = createStore({
  state: initState,
  getters,
  actions,
  mutations
});
