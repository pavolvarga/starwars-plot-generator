import React, { FC, useState } from 'react';

import { AppState, InputFormState, Suggestion, ResourceData, InputState, SelectedSuggestions } from "./common/types";
import { FAILED_LOAD_COOL_DOWN, getPluralName, getMandatoryResourceNames } from "./common/const";
import { LoadSWDataResolveFn, LoadSWDataRejectFn, loadStarWarsData } from "./common/load-data";

export const AppContext = React.createContext<AppState | undefined>(undefined);

const initialState: InputFormState = {
    person: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

export const AppStateProvider: FC = (props: any) => {

    const [appState, setAppState] = useState(initialState);

    //todo: updating state can be refactored into a helper method

    /**
     * Set value picked by user as a suggestion for a resource
     * @param name  - name of a resource (person, plane, ...)
     * @param suggestion - selected value by user (or undefined if empty)
     */
    function setSelectedSuggestion(name: string, suggestion: Suggestion | undefined): void {
        setAppState((prevState: InputFormState) => {
            const
                resource = prevState[name],
                updatedResource = {...resource, ...{loadingInProgress: false, selected: suggestion}};
            return {...prevState, ...{[name]: updatedResource}};
        });
    }

    /**
     * Load data for a given resource (people, planets, ...) and store it into state.
     * Set proper flag while loading is in progress.
     * In case of error it will set proper flag as well.
     * Loading is asynchronous (using promise), check values of fields loadingInProgress and loadingFailed.
     *
     * @param name - resource name
     */
    function loadResourceData(name: string): void {
        const
            resourcePlural = getPluralName(name),
            resolve: LoadSWDataResolveFn = function storeResourceData(value: ResourceData[]): void {
                setAppState((prevState: InputFormState) => {
                    const
                        resource = prevState[name],
                        updatedResource = {...resource, ...{loadingInProgress: false, data: value, visible: true}};
                    return {...prevState, ...{[name]: updatedResource}};
                });
            },
            reject: LoadSWDataRejectFn = function updateLoadFailed(err: Error): void {
                setAppState((prevState: InputFormState) => {
                    const
                        resource = prevState[name],
                        updatedResource = {...resource, ...{loadingInProgress: false, loadFailed: true}};
                    return {...prevState, ...{[name]: updatedResource}};
                });

                //clear alert after specified time, and allow user to try it again
                setTimeout(function clearLoadFailed() {
                    setAppState((prevState: InputFormState) => {
                        const
                            resource = prevState[name],
                            updatedResource = {...resource, ...{visible: false, loadFailed: false}};
                        return {...prevState, ...{[name]: updatedResource}};
                    });
                }, FAILED_LOAD_COOL_DOWN * 1000);
            };

        //todo: test the error scenario

        //set the flag for loading of data in progress to true
        setAppState((prevState: InputFormState) => {
            const resource = prevState[name];

            //data already loaded - nothing to do
            if (resource.data.length > 0) {
                return prevState;
            }

            const updatedResource = {...resource, ...{loadingInProgress: true}};
            return {...prevState, ...{[name]: updatedResource}};
        });

        //data already loaded - do not load them again
        if (appState[name].data.length === 0) {
            loadStarWarsData(resourcePlural, resolve, reject);
        }
    }

    /**
     * Returns true if data were loaded for all mandatory resourses, false otherwise.
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

    function isVisible(name: string) {
        return appState[name].visible;
    }

    function getData(name: string) {
        return appState[name].data;
    }

    function hasLoadFailed(name: string) {
        return appState[name].loadFailed;
    }

    function toggleVisibility(name: string) {
        setAppState((prevState: InputFormState) => {
            const resource = prevState[name];

            //load data for the input in other function, after the input became visible, if it hasn't been already loaded
            if(!resource.loadingInProgress && resource.data.length === 0) {
                setTimeout(() => loadResourceData(name), 1);
                const updatedResource = {...resource, ...{loadingInProgress: true, visible: true}};
                return {...prevState, ...{[name]: updatedResource}};
            }

            const updatedResource = {...resource, ...{visible: !resource.visible}};
            return {...prevState, ...{[name]: updatedResource}};
        });
    }

    function getSelectedSuggestions() {
        //todo: index should not be a string but a resources key
        const obj: SelectedSuggestions = {};
        Object.keys(appState).forEach(key => {
            obj[key] = appState[key].selected;
        });
        return obj;
    }

    function areMandatoryResourcesSelected() {
        const
            mandatory = getMandatoryResourceNames(),
            mandatoryResources: InputState[] = Object
                .entries(appState)
                .filter(e => mandatory.find(s => e[0] === s))
                .map(e => e[1]);

        return mandatoryResources.every(r => r.selected !== undefined);
    }

    /**
     * Clear the selected atttribute for all resources
     */
    function clearSelectedSuggestions() {
        setAppState((prevState: InputFormState): InputFormState => {
            return Object
                .entries(prevState)
                .map(([key, value]) => {
                    const updatedResource = {...value, ...{selected: undefined}};
                    return ([key, updatedResource] as [string, InputState]);
                })
                .reduce((acc: any, entry) => {
                    acc[entry[0]] = entry[1];
                    return acc;
                }, {});
        });
    }

    return (
        <AppContext.Provider
            value={{
                appState, //just for debugging - delete afterwards
                setSelectedSuggestion,
                loadResourceData,
                isLoadedMandatoryData,
                loadMandatoryResourceData,
                isVisible,
                getData,
                hasLoadFailed,
                toggleVisibility,
                getSelectedSuggestions,
                areMandatoryResourcesSelected,
                clearSelectedSuggestions
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

