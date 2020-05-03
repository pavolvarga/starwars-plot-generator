import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import { LOAD_STARTED_STARSHIPS, SAVE_STARSHIPS } from "../actions/starship";

function loadStartedStarships(starships: InputState): InputState {
    return {
        ...starships,
        loadingInProgress: true
    };
}

function saveStarships(starships: InputState, speciesData: any): InputState {
    return {
        ...starships,
        loadingInProgress: false,
        data: speciesData
    };
}

export function reducerStarship(species: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_STARSHIPS:
            return loadStartedStarships(species);
        case SAVE_STARSHIPS:
            return saveStarships(species, action.persons);
        default:
            return species;
    }
}
