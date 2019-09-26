
//todo: rethink names of types

export type ResourceData = {
    name: string,
    url: string
};

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

export type Resources = {
    person: Resource,
    planet: Resource,
    starship: Resource,
    vehicle: Resource,
    species: Resource,
    //todo: use keyof - do not allow other that key to be used
    [index: string]: Resource
}

//todo: use typeof for state declaration
export type InputFormState = {
    person: InputState,
    planet: InputState,
    starship: InputState,
    vehicle: InputState,
    species: InputState,
    //todo: use keyof - do not allow other that key to be used
    [index: string]: InputState
};

export type Resource = {
    plural: string,
    singular: string,
    mandatory: boolean,
    label: string | undefined
};

export type SelectedSuggestions = { [index: string]: Suggestion | undefined };

export type AppState = {
    setSelectedSuggestion: (name: string, s: Suggestion | undefined) => void,
    loadResourceData: (name: string) => void,
    isLoadedMandatoryData: () => boolean,
    loadMandatoryResourceData: () => void,
    isVisible: (name: string) => boolean,
    getData: (name: string) => ResourceData[],
    hasLoadFailed: (name: string) => boolean,
    toggleVisibility: (name: string) => void,
    getSelectedSuggestions: () => SelectedSuggestions,
    areMandatoryResourcesSelected: () => boolean,
    clearSelectedSuggestions: () => void,
    hasLoadingOfMandatoryDataFailed: () => boolean,
    failedLoadingOfOptionalData: () => string[]
}