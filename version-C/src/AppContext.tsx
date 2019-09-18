import React from 'react';

import {AppState, InputFormState} from "./common/types";
import { Suggestion } from "../../version-B/src/pages/home/StarWarsSearch";

export const AppContext = React.createContext<AppState | undefined>(undefined);

const initialState: InputFormState = {
    person: {visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

export const AppStateProvider: any = (props: any) => {

    /**
     * Set value picked by user as a suggestion for a resource
     * @param state - the global state
     * @param name  - name of a resource (person, plane, ...)
     * @param suggestion - selected value by user (or undefined if empty)
     */
    function setSelectedSuggestion(state: InputFormState, name: string, suggestion: Suggestion | undefined): void {
        const
            resource = state[name],
            updated = Object.assign(resource, {selected: suggestion}),
            obj: {[index: string]: any} = {};

        obj[name] = updated;
        Object.assign(state, obj);
    }

    return (
        <AppContext.Provider
            value={{
                state: initialState,
                setSelectedSuggestion
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

