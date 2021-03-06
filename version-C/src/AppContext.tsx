import React, { FC, useState } from 'react';

import { initialFormState } from "./common/common";

import {
    AppState,
    InputFormState,
    Suggestion,
    InputState,
    SelectedSuggestions,
    ResourceKey
} from "./common/types";
import { FAILED_LOAD_COOL_DOWN, getPluralName, getMandatoryResourceNames, getOptionalResourceNames } from "./common/common";
import { LoadSWDataResolveFn, LoadSWDataRejectFn, loadStarWarsData } from "./common/load-data";

export const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppStateProvider: FC = (props: any) => {

    const [appState, setAppState] = useState(initialFormState);

    function updateInputState(name: ResourceKey, prevState: InputFormState, updatePayload: Partial<InputState>) {
        const
            inputState = prevState[name],
            updatedInputState = {...inputState, ...updatePayload};
        return {...prevState, ...{[name]: updatedInputState}}
    }

    /**
     * Set value picked by user as a suggestion for a resource
     * @param name  - name of a resource (person, plane, ...)
     * @param suggestion - selected value by user (or undefined if empty)
     */
    function setSelectedSuggestion(name: ResourceKey, suggestion: Suggestion | undefined): void {
        setAppState((prevState: InputFormState) => {
            return updateInputState(name, prevState, {loadingInProgress: false, selected: suggestion});
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
    function loadResourceData(name: ResourceKey): void {
        const
            resourceNamePlural = getPluralName(name),
            resolve: LoadSWDataResolveFn = function storeResourceData(value: Suggestion[]): void {
                setAppState((prevState: InputFormState) => {
                    return updateInputState(name, prevState, {loadingInProgress: false, data: value, visible: true});
                });
            },
            reject: LoadSWDataRejectFn = function updateLoadFailed(err: Error): void {
                setAppState((prevState: InputFormState) => {
                    return updateInputState(name, prevState, {loadingInProgress: false, loadFailed: true});
                });

                //clear alert after specified time, and allow user to try it again
                setTimeout(function clearLoadFailed() {
                    setAppState((prevState: InputFormState) => {
                        return updateInputState(name, prevState, {visible: false, loadFailed: false});
                    });
                }, FAILED_LOAD_COOL_DOWN * 1000);
            };

        //set the flag for loading of data in progress to true
        setAppState((prevState: InputFormState) => {
            const inputState = prevState[name];

            //data already loaded - nothing to do
            if (inputState.data.length > 0) {
                return prevState;
            }

            const updatedInputState = {...inputState, ...{loadingInProgress: true}};
            return {...prevState, ...{[name]: updatedInputState}};
        });

        //data already loaded - do not load them again
        if (appState[name].data.length === 0) {
            loadStarWarsData(resourceNamePlural, resolve, reject);
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
        const mandatory = getMandatoryResourceNames();
        mandatory.forEach(n  => loadResourceData(n));
    }

    function isVisible(name: ResourceKey) {
        return appState[name].visible;
    }

    function getData(name: ResourceKey) {
        return appState[name].data;
    }

    function hasLoadFailed(name: ResourceKey) {
        return appState[name].loadFailed;
    }

    function toggleVisibility(name: ResourceKey) {
        setAppState((prevState: InputFormState) => {
            const inputState = prevState[name];

            //load data for the input in other function, after the input became visible, if it hasn't been already loaded
            if(!inputState.loadingInProgress && inputState.data.length === 0) {
                setTimeout(() => loadResourceData(name), 1);
                const updatedInputState = {...inputState, ...{loadingInProgress: true, visible: true}};
                return {...prevState, ...{[name]: updatedInputState}};
            }

            const updatedInputState = {...inputState, ...{visible: !inputState.visible}};
            return {...prevState, ...{[name]: updatedInputState}};
        });
    }

    function getSelectedSuggestions() {
        const obj: SelectedSuggestions = {};
        Object.keys(appState).forEach(key  => {
            obj[key] = appState[key as ResourceKey].selected;
        });
        return obj;
    }

    function getInputStates(names: string[]): InputState[] {
        return Object
            .entries(appState)
            .filter(e => names.find(s => e[0] === s))
            .map(e => e[1]);
    }

    /**
     * Return true if all mandatory resources / fields were filled in
     */
    function areMandatoryInputsSelected() {
        return getInputStates(getMandatoryResourceNames()).every(r => r.selected !== undefined);
    }

    /**
     * Clear the selected atttribute for all resources
     */
    function clearSelectedSuggestions() {
        setAppState((prevState: InputFormState): InputFormState => {
            return Object
                .entries(prevState)
                .map(([key, value]) => {
                    const updatedInputState = {...value, ...{selected: undefined}};
                    return ([key, updatedInputState] as [string, InputState]);
                })
                .reduce((acc: any, entry) => {
                    acc[entry[0]] = entry[1];
                    return acc;
                }, {});
        });
    }

    /**
     * Return true if not all mandatory resources were loaded
     */
    function hasLoadingOfMandatoryDataFailed() {
        return getInputStates(getMandatoryResourceNames()).some(r => r.loadFailed);
    }

    /**
     * Return list of names of optional resources which were not loaded
     */
    function failedLoadingOfOptionalData() {
        const optional = getOptionalResourceNames();
        return (
            Object
                .entries(appState)
                .filter(e => optional.find(s => e[0] === s))
                .map(([key, val]) => val.loadFailed ? key : undefined)
                .filter(name => name !== undefined) as string[]
        );
    }

    return (
        <AppContext.Provider
            value={{
                setSelectedSuggestion,
                loadResourceData,
                isLoadedMandatoryData,
                loadMandatoryResourceData,
                isVisible,
                getData,
                hasLoadFailed,
                toggleVisibility,
                getSelectedSuggestions,
                areMandatoryInputsSelected,
                clearSelectedSuggestions,
                hasLoadingOfMandatoryDataFailed,
                failedLoadingOfOptionalData
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

