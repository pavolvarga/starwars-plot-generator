import { writable } from 'svelte/store';
import type { Resources } from './types';

const store = writable<Resources | null>(null);

export const resourcesStore = {
  subscribe: store.subscribe,
  init: function init(data: Resources) {
    store.set(data);
  }
};
