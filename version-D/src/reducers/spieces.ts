import {InputState, Suggestion} from "../common/types";
import { initialFormState } from "./reducer";
import {
    LOAD_SPECIES_FAILED,
    LOAD_STARTED_SPECIES, REVERT_LOAD_SPECIES,
    SAVE_SPECIES,
    SET_SELECTED_SPECIES,
    TOGGLE_SPECIES_VISIBLE
} from "../actions/species";

function loadStartedSpecies(species: InputState): InputState {
    return {
        ...species,
        loadingInProgress: true
    };
}

function saveSpecies(species: InputState, speciesData: any): InputState {
    return {
        ...species,
        loadingInProgress: false,
        data: speciesData
    };
}

function toggleSpeciesVisible(species: InputState): InputState {
    return {
        ...species,
        visible: !species.visible
    }
}

function loadSpeciesFailed(species: InputState): InputState {
    return {
        ...species,
        loadingInProgress: false,
        loadFailed: true
    };
}

function setSelectedSpecies(species: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...species,
        selected: payload
    };
}

function revertLoadSpecies(species: InputState): InputState {
    return {
        ...species,
        visible: false,
        loadFailed: false
    };
}

export function reducerSpecies(species: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_SPECIES:
            return loadStartedSpecies(species);
        case SAVE_SPECIES:
            return saveSpecies(species, action.species);
        case SET_SELECTED_SPECIES:
            return setSelectedSpecies(species, action.payload);
        case TOGGLE_SPECIES_VISIBLE:
            return toggleSpeciesVisible(species);
        case LOAD_SPECIES_FAILED:
            return loadSpeciesFailed(species);
        case REVERT_LOAD_SPECIES:
            return revertLoadSpecies(species);
        default:
            return species;
    }
}
