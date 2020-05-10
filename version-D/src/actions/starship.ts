import { loadStarWarsData } from "../common/load-data";
import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";
import { loadStarted, save } from "./actions";

export const SAVE_STARSHIP = 'SAVE_STARSHIP';
export const TOGGLE_STARSHIP_VISIBLE = 'TOGGLE_STARSHIP_VISIBLE';
export const LOAD_STARTED_STARSHIP = 'LOAD_STARTED_STARSHIP';
export const LOAD_STARSHIPS_FAILED = 'LOAD_STARSHIPS_FAILED';
export const SET_SELECTED_STARSHIP = 'SET_SELECTED_STARSHIP';
export const REVERT_LOAD_STARSHIPS = 'REVERT_LOAD_STARSHIPS';

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
        dispatch(loadStarted(RESOURCES.starship.singular));
        return loadStarWarsData(RESOURCES.starship.plural)
            .then((data: any) => dispatch(save(RESOURCES.starship.singular, data)))
            .catch(() => {
                dispatch(loadStarshipsFailed());
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadStarships()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}