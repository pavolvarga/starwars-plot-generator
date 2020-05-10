import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";
import { loadStarted, save } from "./actions";

export const SAVE_PLANET = 'SAVE_PLANET';
export const LOAD_STARTED_PLANET = 'LOAD_STARTED_PLANET';
export const SET_SELECTED_PLANET = 'SET_SELECTED_PLANET';
export const LOAD_PLANETS_FAILED = 'LOAD_PLANETS_FAILED';

function loadPlanetsFailed() {
    return {
        type: LOAD_PLANETS_FAILED
    }
}

export function loadPlanets() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.planet.singular));
        return loadStarWarsData(RESOURCES.planet.plural)
            .then((data: any) => dispatch(save(RESOURCES.planet.singular, data)))
            .catch(() => dispatch(loadPlanetsFailed()));
    };
}