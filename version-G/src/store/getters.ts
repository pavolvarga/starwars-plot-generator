import { InputFormState } from '@/store/types';
import { ResourceKey } from '@/api/types';
import { getMandatoryInputs, getOptionalInputs } from '@/store/store';

export const getters = {
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
  getFailedOptionalInputNames(formState: InputFormState) {
    return getOptionalInputs(formState)
      .filter(inputState => inputState.loadFailed)
      .map(inputState => inputState.name);
  },

  getLoadFailed(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].loadFailed;
    }
  },
  getVisible(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].visible;
    }
  },
  getDataLoaded(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].data.length > 0;
    }
  },
  getLoadingInProgress(formState: InputFormState) {
    return function(name: ResourceKey) {
      return formState[name].loadingInProgress;
    }
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
