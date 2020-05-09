import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import {LOAD_STARTED_STARSHIPS, SAVE_STARSHIPS, TOGGLE_STARSHIP_VISIBLE} from "../actions/starship";

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

export function reducerStarship(starship: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_STARSHIPS:
            return loadStartedStarships(starship);
        case SAVE_STARSHIPS:
            return saveStarships(starship, action.persons);
        case TOGGLE_STARSHIP_VISIBLE:
            return toggleStarshipVisible(starship);
        default:
            return starship;
    }
}
