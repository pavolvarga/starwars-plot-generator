import React, {useState} from 'react';

import {AppState, InputFormState, Suggestion, ResourceData, LoadResDataFn, InputState} from "./common/types";
import {FAILED_LOAD_COOL_DOWN, getPluralName, getMandatoryResourceNames} from "./common/const";
import {LoadSWDataResolveFn, LoadSWDataRejectFn, loadStarWarsData} from "./common/load-data";

export const AppContext = React.createContext<AppState | undefined>(undefined);

const initialState: InputFormState = {
    person: {visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

export const AppStateProvider: any = (props: any) => {

    const [appState, setAppState] = useState(initialState);

    /**
     * Set value picked by user as a suggestion for a resource
     * @param state - the global state
     * @param name  - name of a resource (person, plane, ...)
     * @param suggestion - selected value by user (or undefined if empty)
     */
    function setSelectedSuggestion(name: string, suggestion: Suggestion | undefined): void {
        const
            resource = appState[name],
            updated = Object.assign(resource, {selected: suggestion}),
            obj: {[index: string]: any} = {};

        obj[name] = updated;
        setAppState(Object.assign(appState, obj));
    }

    /**
     * Load data for a given resource (people, planets, ...) and store it into state.
     * Set proper flag while loading is in progress.
     * In case of error it will set proper flag as well.
     * Loading is asynchronous (using promise), check values of fields loadingInProgress and loadingFailed.
     *
     * @param state - global app state
     * @param name - resource name
     */
    function loadResourceData(name: string): void {
        const
            resourcePlural = getPluralName(name),
            resolve: LoadSWDataResolveFn = function storeResourceData(value: ResourceData[]): void {
                setAppState((prevState: InputFormState) => {
                        const
                            resource = prevState[name],
                            updatedResource = {...resource, ...{loadingInProgress: false, data: value}};
                        return {...prevState, ...{[name]: updatedResource}};
                    }
                );
            },
            reject: LoadSWDataRejectFn = function updateLoadFailed (err: Error): void {
                const
                    resource = appState[name],
                    obj: {[index: string]: any} = {},
                    updated = Object.assign(resource, {loadFailed: true, loadingInProgress: false});

                obj[name] = updated;
                setAppState(Object.assign(appState, obj));

                //clear alert after specified time, and allow user to try it again
                setTimeout(function clearLoadFailed() {
                    const cleared = Object.assign(resource, {visible: false, loadFailed: false});
                    obj[name] = cleared;
                    setAppState(Object.assign(appState, obj));
                }, FAILED_LOAD_COOL_DOWN * 1000);
            };

        //todo: set loadInProgress to true, before a request is sent to api

        loadStarWarsData(resourcePlural, resolve, reject);
    }

    /**
     * Set visible flag of a resource to true.
     * This will be done only if data is already loaded.
     * If it isn't loaded and the loading is not in progress, the data will be loaded from backend service.
     *
     * @param state - global app state
     * @param name - resource name (people, planets, ...)
     * @param loadResourceData - function for loading resource data
     */
    function toggleVisibility(name: string, loadResourceData: LoadResDataFn): void {

        const
            resource = appState[name],
            obj: {[index: string]: any} = {};

        let updated = Object.assign(resource, {visible: !resource.visible, selected: undefined});

        //load data for the input in other function, after the input became visible
        //if it wasn't already loaded
        if(!appState[name].loadingInProgress && appState[name].data.length === 0) {
            updated = Object.assign(updated, {loadingInProgress: true});
            setTimeout(() => loadResourceData(name), 1);
        }

        obj[name] = updated;
        setAppState(Object.assign(appState, obj));
    }

    /**
     * Returns true if data were loaded for all mandatory resourses, false otherwise.
     * @param state - global app state
     */
    function isLoadedMandatoryData(): boolean {
        const
            mandatory = getMandatoryResourceNames(),
            mandatoryResources: InputState[] = Object
                .entries(appState)
                .filter(e => mandatory.find(s => e[0] === s))
                .map(e => e[1]);

        return mandatoryResources.every(r => r.data.length > 0);
    }

    function loadMandatoryResourceData() {
        const mandatory: string[] = getMandatoryResourceNames();
        mandatory.forEach(n  => loadResourceData(n));
    }

    return (
        <AppContext.Provider
            value={{
                state: appState,
                setSelectedSuggestion,
                loadResourceData,
                toggleVisibility,
                isLoadedMandatoryData,
                loadMandatoryResourceData
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

