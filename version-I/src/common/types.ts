
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
    resourceKey: ResourceKey,
    mandatory: boolean,
    visible: boolean,
    selected: Suggestion | undefined,
    data: Suggestion[],
    label: string,
};

export type Resource = {
    plural: string,
    singular: string,
    mandatory: boolean,
    label: string | null,
    suggestions: Suggestion[] | null,
};

export type Resources = {
    [index in ResourceKey]: Resource;
};

export type SelectedSuggestions = { [index: string]: Suggestion | undefined };

export type AppState = {
  [index in ResourceKey]: Suggestion | undefined;
};
