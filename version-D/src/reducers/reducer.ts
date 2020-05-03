import {InputFormState} from "../common/types";
import {LOAD_STARTED_PERSONS, SAVE_PERSONS} from "../actions/person";
import {LOAD_STARTED_PLANETS, SAVE_PLANETS} from "../actions/planet";

const initialFormState: InputFormState = {
    person: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

function loadStartedPersons(state: InputFormState): InputFormState {
    const updatedPerson = {
        ...state.person,
        loadingInProgress: true
    };
    return {...state, person: updatedPerson};
}

function savePersons(state: InputFormState, persons: any): InputFormState {
    const updatedPerson = {
        ...state.person,
        loadingInProgress: false,
        data: persons
    };
    return {...state, person: updatedPerson};
}

function loadStartedPlanets(state: InputFormState): InputFormState {
    const updatedPlanet = {
        ...state.planet,
        loadingInProgress: true
    }
    return {...state, planet: updatedPlanet}
}

function savePlanets(state: InputFormState, planets: any): InputFormState {
    const updatedPlanets = {
        ...state.planet,
        loadingInProgress: false,
        data: planets
    };
    return {...state, planet: updatedPlanets};
}

const rootReducer = (state: InputFormState = initialFormState, action: any) => {
    switch (action.type) {
        case LOAD_STARTED_PERSONS:
            return loadStartedPersons(state);
        case SAVE_PERSONS:
            return savePersons(state, action.persons);
        case LOAD_STARTED_PLANETS:
            return loadStartedPlanets(state);
        case SAVE_PLANETS:
            return savePlanets(state, action.planets);
        default:
            return state;
    }
};

export { rootReducer as reducer };