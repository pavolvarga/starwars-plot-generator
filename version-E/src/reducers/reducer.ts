import _ from "lodash";
import { combineReducers } from "redux";

import { InputFormState } from "../common/types";
import { reducerPerson } from "./person";
import { reducerPlanet } from "./planet";
import { reducerSpecies } from "./spieces";
import { reducerStarship } from "./starship";
import { reducerVehicle } from "./vehicle";
import { RESET_SELECTED_RESOURCES } from "../actions/actions";
import { getOptionalResourceNames, getResourceNames } from "../common/common";

export const initialFormState: InputFormState = {
    person: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

function resetSelectedResources(state: InputFormState): InputFormState {
    const cloned = _.cloneDeep(state);
    getResourceNames().forEach(name => cloned[name].selected = undefined);
    getOptionalResourceNames().forEach(name => cloned[name].visible = false);
    return cloned;
}

const combinedReducer = combineReducers({
    person: reducerPerson,
    planet: reducerPlanet,
    starship: reducerStarship,
    vehicle: reducerVehicle,
    species: reducerSpecies
});

export function reducer(state: InputFormState = initialFormState, action: any): InputFormState {
    switch (action.type) {
        case RESET_SELECTED_RESOURCES:
            return resetSelectedResources(state);
        default:
            return combinedReducer(state, action);
    }
}
