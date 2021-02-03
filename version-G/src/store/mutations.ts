import { InputFormState, MutationPayload } from '@/store/types';

export const mutations = {
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
