
/**
 * What resources are used from StarWars API.
 * Each resource is represented as an autosuggest field on a screen.
 */
export type ResourceKey = 'person' | 'planet' | 'starship' | 'vehicle' | 'species';

export type Suggestion = {
  name: string,
  url: string
}

export type InputState = {
  name: ResourceKey;
  visible: boolean;
  selected: Suggestion | undefined;
  data: Suggestion[];
  loadingInProgress: boolean;
  loadFailed: boolean;
  mandatory: boolean;
  label: string;
};

export type InputFormState = {
  [index in ResourceKey]: InputState;
};

export type Resource = {
  plural: string;
  singular: string;
  mandatory: boolean;
  label: string | undefined;
};

export type Resources = {
  [index in ResourceKey]: Resource;
};
