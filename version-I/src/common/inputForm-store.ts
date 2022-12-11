import { cloneDeep } from 'lodash';
import { writable } from 'svelte/store';
import type { InputFormState, InputState, ResourceKey, Resources } from './types';

const store = writable<InputState[]>([]);

function setUp(data: Resources) {
  return Object.entries(data).reduce((acc, [key, val]) => {
    acc.push({
      resourceKey: key,
      mandatory: val.mandatory,
      visible: val.mandatory,
      selected: undefined,
      data: val.suggestions,
      label: val.label ? val.label : val.singular,
    });
    return acc;
  }, []) as InputState[];
}

export const inputFormStore = {
  subscribe: store.subscribe,
  init: function init(data: Resources) {
    store.set(setUp(data));
  },
  toggleVisibility(resourceKey: ResourceKey) {
    store.update(data => {
      const cloned = cloneDeep(data);
      const item = cloned.find((item: InputState) => item.resourceKey === resourceKey);
      item.visible = !item.visible;
      console.log('!!', cloned);
      return cloned;
    });
  }
};
