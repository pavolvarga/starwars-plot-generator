import {InputState, Suggestion} from "../common/types";
import { initialFormState } from "./reducer";
import {
    LOAD_STARSHIP_FAILED,
    LOAD_STARTED_STARSHIP,
    REVERT_LOAD_STARSHIPS,
    SAVE_STARSHIP, SET_SELECTED_STARSHIP,
    TOGGLE_STARSHIP_VISIBLE
} from "../actions/starship";

function loadStartedStarships(starship: InputState): InputState {
    return {
        ...starship,
        loadingInProgress: true
    };
}

function saveStarships(starships: InputState, data: any): InputState {
    return {
        ...starships,
        loadingInProgress: false,
        data
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
        case LOAD_STARTED_STARSHIP:
            return loadStartedStarships(starship);
        case SAVE_STARSHIP:
            return saveStarships(starship, action.data);
        case SET_SELECTED_STARSHIP:
            return setSelectedStarship(starship, action.payload);
        case TOGGLE_STARSHIP_VISIBLE:
            return toggleStarshipVisible(starship);
        case LOAD_STARSHIP_FAILED:
            return loadStarshipsFailed(starship);
        case REVERT_LOAD_STARSHIPS:
            return revertLoadStarships(starship);
        default:
            return starship;
    }
}
