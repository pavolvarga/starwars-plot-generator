import { InputState, Payload } from '@/store/types';
import { loadStarWarsData, ResourceData } from '@/api/load-data';
import { ResourceKey, Suggestion } from '@/api/types';
import {COOL_DOWN, getOptionalInputs, mandatory, optional} from '@/store/store';

export const actions = {
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
  },
  hideOptionalInputs(context: any) {
    optional.forEach(name => context.commit("setVisible", { name, visible: false }));
  }
};
