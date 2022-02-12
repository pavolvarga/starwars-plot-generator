import {cloneDeep} from 'lodash';
import {InputFormState, InputState, Resources} from '@/common/types';

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

type Action = ToggleVisibilityAction;

type ToggleVisibilityActionPayload = {
  name: string;
}
type ToggleVisibilityAction = {
  type: 'TOGGLE_VISIBILITY_ACTION',
  payload: ToggleVisibilityActionPayload,
}

export function reducer(state: InputFormState, action: Action): InputFormState {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_VISIBILITY_ACTION':
      return handleToggleVisibilityAction(state, payload as unknown as ToggleVisibilityActionPayload);
    default:
      throw new Error(`Unknown ${type}`);
  }
}

function handleToggleVisibilityAction(state: InputFormState, { name }: ToggleVisibilityActionPayload): InputFormState {
  const newState = cloneDeep(state);
  newState[name].visible = !newState[name].visible;
  return newState;
}


