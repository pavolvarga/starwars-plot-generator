import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const TOGGLE_STARSHIP_VISIBLE = 'TOGGLE_STARSHIP_VISIBLE';
export const SAVE_STARSHIPS = 'SAVE_STARSHIPS';
export const LOAD_STARTED_STARSHIPS = 'LOAD_STARTED_STARSHIPS';

export function loadStartedStarships() {
    return {
        type: LOAD_STARTED_STARSHIPS
    }
}

export function saveStarships(data: any) {
    return {
        type: SAVE_STARSHIPS,
        starship: data
    };
}

export function loadStarships() {
    return function (dispatch: any) {
        dispatch(loadStartedStarships());
        return loadStarWarsData(RESOURCES.starship.plural)
            .then((data: any) => dispatch(saveStarships(data)));
    };
}