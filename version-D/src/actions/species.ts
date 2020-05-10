import { loadStarWarsData } from "../common/load-data";
import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";
import { loadFailed, loadStarted, save } from "./actions";

export const SAVE_SPECIES = 'SAVE_SPECIES';
export const TOGGLE_SPECIES_VISIBLE = 'TOGGLE_SPECIES_VISIBLE';
export const LOAD_STARTED_SPECIES = 'LOAD_STARTED_SPECIES';
export const LOAD_SPECIES_FAILED = 'LOAD_SPECIES_FAILED';
export const SET_SELECTED_SPECIES = 'SET_SELECTED_SPECIES';
export const REVERT_LOAD_SPECIES = 'REVERT_LOAD_SPECIES';

function revertLoadSpecies() {
    return {
        type: REVERT_LOAD_SPECIES
    };
}

export function loadSpecies() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.species.singular));
        return loadStarWarsData(RESOURCES.species.plural)
            .then((data: any) => dispatch(save(RESOURCES.species.singular, data)))
            .catch(() => {
                dispatch(loadFailed(RESOURCES.species.singular));
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadSpecies()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}