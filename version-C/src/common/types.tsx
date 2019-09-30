
//todo: rethink names of types

/**
 * What resources are used from StarWars API.
 * Each resource is represented as an autosuggest field on a screen.
 */
export type ResourceKey = 'person' | 'planet' | 'starship' | 'vehicle' | 'species';

export type ResourceData = {
    name: string,
    url: string
};

//todo: merge ResourceData and Suggestion

export type Suggestion = {
    name: string,
    url: string
}

export type InputState = {
    visible: boolean,
    selected: Suggestion | undefined,
    data: ResourceData[],
    loadingInProgress: boolean,
    loadFailed: boolean
};

//todo: use typeof for state declaration
export type InputFormState = {
    [index in ResourceKey]: InputState
};

export type Resource = {
    plural: string,
    singular: string,
    mandatory: boolean,
    label: string | undefined
};

export type Resources = {
    [index in ResourceKey]: Resource;
};

export type SelectedSuggestions = { [index: string]: Suggestion | undefined };

export type AppState = {
    setSelectedSuggestion: (name: ResourceKey, s: Suggestion | undefined) => void,
    loadResourceData: (name: ResourceKey) => void,
    isLoadedMandatoryData: () => boolean,
    loadMandatoryResourceData: () => void,
    isVisible: (name: ResourceKey) => boolean,
    getData: (name: ResourceKey) => ResourceData[],
    hasLoadFailed: (name: ResourceKey) => boolean,
    toggleVisibility: (name: ResourceKey) => void,
    getSelectedSuggestions: () => SelectedSuggestions,
    areMandatoryInputsSelected: () => boolean,
    clearSelectedSuggestions: () => void,
    hasLoadingOfMandatoryDataFailed: () => boolean,
    failedLoadingOfOptionalData: () => string[]
}