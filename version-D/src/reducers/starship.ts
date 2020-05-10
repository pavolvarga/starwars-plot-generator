import {InputState, Suggestion} from "../common/types";
import { initialFormState } from "./reducer";
import {
    LOAD_STARSHIPS_FAILED,
    LOAD_STARTED_STARSHIPS,
    REVERT_LOAD_STARSHIPS,
    SAVE_STARSHIPS, SET_SELECTED_STARSHIP,
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

function setSelectedStarship(starship: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...starship,
        selected: payload
    };
}

function revertLoadStarships(starship: InputState): InputState {
    return {
        ...starship,
        visible: false,
        loadFailed: false
    };
}

export function reducerStarship(starship: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_STARSHIPS:
            return loadStartedStarships(starship);
        case SAVE_STARSHIPS:
            return saveStarships(starship, action.starships);
        case SET_SELECTED_STARSHIP:
            return setSelectedStarship(starship, action.payload);
        case TOGGLE_STARSHIP_VISIBLE:
            return toggleStarshipVisible(starship);
        case LOAD_STARSHIPS_FAILED:
            return loadStarshipsFailed(starship);
        case REVERT_LOAD_STARSHIPS:
            return revertLoadStarships(starship);
        default:
            return starship;
    }
}
