import { InputState, Suggestion } from "../common/types";
import {
    LOAD_PLANET_FAILED,
    LOAD_STARTED_PLANET,
    REVERT_LOAD_PLANET,
    SAVE_PLANET,
    SET_SELECTED_PLANET,
    TOGGLE_PLANET_VISIBLE
} from "../actions/planet";
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

function togglePlanetVisible(planet: InputState): InputState {
    return {
        ...planet,
        visible: !planet.visible
    };
}
function revertLoadPlanet(planet: InputState): InputState {
    return {
        ...planet,
        visible: false,
        loadFailed: false
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
        case LOAD_PLANET_FAILED:
            return loadPlanetsFailed(planet);
        case TOGGLE_PLANET_VISIBLE:
            return togglePlanetVisible(planet);
        case REVERT_LOAD_PLANET:
            return revertLoadPlanet(planet);
        default:
            return planet;
    }
}