import {cloneDeep} from 'lodash';
import {InputFormState, InputState, Resources, Suggestion} from '@/common/types';

export function createInitState(resources: Resources): InputFormState {
  return Object
    .entries(resources)
    .reduce((obj, [name, resource]) => {
      // @ts-ignore
      obj[name] = {
        visible: resource.mandatory,
        selected: undefined,
        data: cloneDeep(resource.suggestions),
        label: resource.label ? resource.label : name,
      };
      return obj as unknown as InputState;
    }, {}) as InputFormState;
}

type Action = ToggleVisibilityAction | SetSelectedValueAction;

type ToggleVisibilityActionPayload = {
  name: string;
}
type ToggleVisibilityAction = {
  type: 'TOGGLE_VISIBILITY_ACTION',
  payload: ToggleVisibilityActionPayload,
}

type SetSelectedValueActionPayload = {
  name: string;
  value: Suggestion | undefined;
};
type SetSelectedValueAction = {
  type: 'SET_SELECTED_VALUE_ACTION',
  payload: SetSelectedValueActionPayload,
};

export function reducer(state: InputFormState, action: Action): InputFormState {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_VISIBILITY_ACTION':
      return handleToggleVisibilityAction(state, payload as unknown as ToggleVisibilityActionPayload);
    case 'SET_SELECTED_VALUE_ACTION':
      return handleSetSelectedValueAction(state, payload as unknown as SetSelectedValueActionPayload);
    default:
      throw new Error(`Unknown ${type}`);
  }
}

function handleSetSelectedValueAction(state: InputFormState, { name, value }: SetSelectedValueActionPayload): InputFormState {
  const newState = cloneDeep(state);
  // @ts-ignore
  newState[name].selected = value;
  return newState;
}

function handleToggleVisibilityAction(state: InputFormState, { name }: ToggleVisibilityActionPayload): InputFormState {
  const newState = cloneDeep(state);
  // @ts-ignore
  newState[name].visible = !newState[name].visible;
  return newState;
}
