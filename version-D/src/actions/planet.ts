import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";
import { loadFailed, loadStarted, save } from "./actions";

export const SAVE_PLANET = 'SAVE_PLANET';
export const LOAD_STARTED_PLANET = 'LOAD_STARTED_PLANET';
export const SET_SELECTED_PLANET = 'SET_SELECTED_PLANET';
export const LOAD_PLANET_FAILED = 'LOAD_PLANET_FAILED';

export function loadPlanets() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.planet.singular));
        return loadStarWarsData(RESOURCES.planet.plural)
            .then((data: any) => dispatch(save(RESOURCES.planet.singular, data)))
            .catch(() => dispatch(loadFailed(RESOURCES.planet.singular)));
    };
}