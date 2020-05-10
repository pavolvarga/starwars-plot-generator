import { loadStarWarsData } from "../common/load-data";
import {FAILED_LOAD_COOL_DOWN, RESOURCES} from "../common/common";

export const TOGGLE_STARSHIP_VISIBLE = 'TOGGLE_STARSHIP_VISIBLE';
export const SAVE_STARSHIPS = 'SAVE_STARSHIPS';
export const LOAD_STARTED_STARSHIPS = 'LOAD_STARTED_STARSHIPS';
export const LOAD_STARSHIPS_FAILED = 'LOAD_STARSHIPS_FAILED';
export const SET_SELECTED_STARSHIP = 'SET_SELECTED_STARSHIP';
export const REVERT_LOAD_STARSHIPS = 'REVERT_LOAD_STARSHIPS';

export function loadStartedStarships() {
    return {
        type: LOAD_STARTED_STARSHIPS
    }
}

export function saveStarships(data: any) {
    return {
        type: SAVE_STARSHIPS,
        starships: data
    };
}

function loadStarshipsFailed() {
    return {
        type: LOAD_STARSHIPS_FAILED
    };
}

function revertLoadStarships() {
    return {
        type: REVERT_LOAD_STARSHIPS
    };
}

export function loadStarships() {
    return function (dispatch: any) {
        dispatch(loadStartedStarships());
        return loadStarWarsData(RESOURCES.starship.plural)
            .then((data: any) => dispatch(saveStarships(data)))
            .catch(() => {
                dispatch(loadStarshipsFailed());
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadStarships()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}