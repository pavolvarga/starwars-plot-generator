import { ResourceKey, Suggestion } from '@/api/types';

export type InputState = {
  name: string;
  visible: boolean;
  selected: Suggestion | undefined;
  data: Suggestion[];
  loadingInProgress: boolean;
  loadFailed: boolean;
  label: string;
  mandatory: boolean;
};

export type InputFormState = {
  [index in ResourceKey]: InputState
};
