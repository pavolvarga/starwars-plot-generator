import { loadStarWarsData } from "../common/load-data";
import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";

export const TOGGLE_SPECIES_VISIBLE = 'TOGGLE_SPECIES_VISIBLE';
export const SAVE_SPECIES = 'SAVE_SPECIES';
export const LOAD_STARTED_SPECIES = 'LOAD_STARTED_SPECIES';
export const LOAD_SPECIES_FAILED = 'LOAD_SPECIES_FAILED';
export const SET_SELECTED_SPECIES = 'SET_SELECTED_SPECIES';
export const REVERT_LOAD_SPECIES = 'REVERT_LOAD_SPECIES';

export function loadStartedSpecies() {
    return {
        type: LOAD_STARTED_SPECIES
    }
}

export function saveSpecies(data: any) {
    return {
        type: SAVE_SPECIES,
        species: data
    };
}

function loadSpeciesFailed() {
    return {
        type: LOAD_SPECIES_FAILED
    };
}

function revertLoadSpecies() {
    return {
        type: REVERT_LOAD_SPECIES
    };
}

export function loadSpecies() {
    return function (dispatch: any) {
        dispatch(loadStartedSpecies());
        return loadStarWarsData(RESOURCES.species.plural)
            .then((data: any) => dispatch(saveSpecies(data)))
            .catch(() => {
                dispatch(loadSpeciesFailed());
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadSpecies()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}