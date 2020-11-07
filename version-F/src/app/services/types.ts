
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
  plural: string;
  visible: boolean;
  selected: Suggestion | undefined;
  data: Suggestion[];
  loadFailed: boolean;
  mandatory: boolean;
  label: string;
};

export type InputFormState = {
  [index in ResourceKey]: InputState;
};

export type SWAResourceResp = {
  previous?: string;
  next?: string;
  results: SWAResult[];
  count: number;
};

export type SWAResult = {
  name: string;
  url: string;
  [key: string]: any;
};

export type Plot = {
  title: string,
  description: string
};
