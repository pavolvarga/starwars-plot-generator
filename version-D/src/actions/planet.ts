import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const SAVE_PLANETS = 'SAVE_PLANETS';
export const LOAD_STARTED_PLANETS = 'LOAD_STARTED_PLANETS';
export const SET_SELECTED_PLANET = 'SET_SELECTED_PLANET';

export function loadStartedPlanets() {
    return {
        type: LOAD_STARTED_PLANETS
    }
}

export function savePlanets(data: any) {
    return {
        type: SAVE_PLANETS,
        planets: data
    };
}

export function loadPlanets() {
    return function (dispatch: any) {
        dispatch(loadStartedPlanets());
        return loadStarWarsData(RESOURCES.planet.plural)
            .then((data: any) => dispatch(savePlanets(data)));
    };
}