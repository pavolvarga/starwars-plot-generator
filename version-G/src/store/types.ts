import { ResourceKey, Suggestion } from '@/api/types';

export type InputState = {
  visible: boolean,
  selected: Suggestion | undefined,
  data: Suggestion[],
  loadingInProgress: boolean,
  loadFailed: boolean
};

export type InputFormState = {
  [index in ResourceKey]: InputState
};
