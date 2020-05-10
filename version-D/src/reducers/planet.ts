import { InputState, Suggestion } from "../common/types";
import { LOAD_PLANETS_FAILED, LOAD_STARTED_PLANET, SAVE_PLANET, SET_SELECTED_PLANET } from "../actions/planet";
import { initialFormState } from "./reducer";

function loadStartedPlanets(planet: InputState): InputState {
    return {
        ...planet,
        loadingInProgress: true,
        visible: true
    };
}

function savePlanets(planet: InputState, data: any): InputState {
    return {
        ...planet,
        loadingInProgress: false,
        data
    };
}

function setSelectedPlanet(planet: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...planet,
        selected: payload
    };
}

function loadPlanetsFailed(planet: InputState): InputState {
    return {
        ...planet,
        loadingInProgress: false,
        loadFailed: true
    };
}

export function reducerPlanet(planet: InputState = initialFormState.planet, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_PLANET:
            return loadStartedPlanets(planet);
        case SAVE_PLANET:
            return savePlanets(planet, action.data);
        case SET_SELECTED_PLANET:
            return setSelectedPlanet(planet, action.payload);
        case LOAD_PLANETS_FAILED:
            return loadPlanetsFailed(planet);
        default:
            return planet;
    }
}