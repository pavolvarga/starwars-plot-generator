import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const TOGGLE_SPECIES_VISIBLE = 'TOGGLE_SPECIES_VISIBLE';
export const SAVE_SPECIES = 'SAVE_SPECIES';
export const LOAD_STARTED_SPECIES = 'LOAD_STARTED_SPECIES';
export const LOAD_SPECIES_FAILED = 'LOAD_SPECIES_FAILED';
export const SET_SELECTED_SPECIES = 'SET_SELECTED_SPECIES';

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

export function loadSpecies() {
    return function (dispatch: any) {
        dispatch(loadStartedSpecies());
        return loadStarWarsData(RESOURCES.species.plural)
            .then((data: any) => dispatch(saveSpecies(data)))
            .catch(() => dispatch(loadSpeciesFailed()));
    };
}