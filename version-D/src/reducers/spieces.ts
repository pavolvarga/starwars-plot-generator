import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import { LOAD_STARTED_SPECIES, SAVE_SPECIES } from "../actions/species";

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

export function reducerSpecies(species: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_SPECIES:
            return loadStartedSpecies(species);
        case SAVE_SPECIES:
            return saveSpecies(species, action.persons);
        default:
            return species;
    }
}
