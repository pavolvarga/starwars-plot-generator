import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";
import {loadStarted} from "./actions";

export const SAVE_PERSONS = 'SAVE_PERSONS';
export const LOAD_STARTED_PERSON = 'LOAD_STARTED_PERSON';
export const SET_SELECTED_PERSON = 'SET_SELECTED_PERSON';
export const LOAD_PERSONS_FAILED = 'LOAD_PERSONS_FAILED';

export function savePersons(data: any) {
    return {
        type: SAVE_PERSONS,
        persons: data
    };
}

function loadPersonsFailed() {
    return {
        type: LOAD_PERSONS_FAILED
    }
}

export function loadPersons() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.person.singular));
        return loadStarWarsData(RESOURCES.person.plural)
            .then((data: any) => dispatch(savePersons(data)))
            .catch(() => dispatch(loadPersonsFailed()));
    }
}
