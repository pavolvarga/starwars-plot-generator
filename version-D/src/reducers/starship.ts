import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import {
    LOAD_STARSHIPS_FAILED,
    LOAD_STARTED_STARSHIPS,
    SAVE_STARSHIPS,
    TOGGLE_STARSHIP_VISIBLE
} from "../actions/starship";

function loadStartedStarships(starship: InputState): InputState {
    return {
        ...starship,
        loadingInProgress: true
    };
}

function saveStarships(starships: InputState, starshipsData: any): InputState {
    return {
        ...starships,
        loadingInProgress: false,
        data: starshipsData
    };
}

function toggleStarshipVisible(starship: InputState): InputState {
    return {
        ...starship,
        visible: !starship.visible
    }
}

function loadStarshipsFailed(starship: InputState): InputState {
    return {
        ...starship,
        loadingInProgress: false,
        loadFailed: true
    };
}


export function reducerStarship(starship: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_STARSHIPS:
            return loadStartedStarships(starship);
        case SAVE_STARSHIPS:
            return saveStarships(starship, action.starships);
        case TOGGLE_STARSHIP_VISIBLE:
            return toggleStarshipVisible(starship);
        case LOAD_STARSHIPS_FAILED:
            return loadStarshipsFailed(starship);
        default:
            return starship;
    }
}
