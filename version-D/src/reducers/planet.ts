import { InputState, Suggestion } from "../common/types";
import { LOAD_STARTED_PLANETS, SAVE_PLANETS, SET_SELECTED_PLANET } from "../actions/planet";
import { initialFormState } from "./reducer";

function loadStartedPlanets(planet: InputState): InputState {
    return {
        ...planet,
        loadingInProgress: true
    };
}

function savePlanets(planet: InputState, planets: any): InputState {
    return {
        ...planet,
        loadingInProgress: false,
        data: planets
    };
}

function setSelectedPlanet(planet: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...planet,
        selected: payload
    };
}

export function reducerPlanet(planet: InputState = initialFormState.planet, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_PLANETS:
            return loadStartedPlanets(planet);
        case SAVE_PLANETS:
            return savePlanets(planet, action.planets);
        case SET_SELECTED_PLANET:
            return setSelectedPlanet(planet, action.payload);
        default:
            return planet;
    }
}