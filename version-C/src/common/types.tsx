
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
    mandatory: boolean
};

export type SelectedSuggestions = { [index: string]: Suggestion | undefined };

export type AppState = {
    appState: InputFormState,
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