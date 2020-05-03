import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const SAVE_SPECIES = 'SAVE_SPECIES';
export const LOAD_STARTED_SPECIES = 'LOAD_STARTED_SPECIES';

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

export function loadSpecies() {
    return function (dispatch: any) {
        dispatch(loadStartedSpecies());
        return loadStarWarsData(RESOURCES.species.plural)
            .then((data: any) => dispatch(saveSpecies(data)));
    };
}