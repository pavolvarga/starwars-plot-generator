import {loadStarWarsData} from "../common/load-data";
import {RESOURCES} from "../common/common";

export const SAVE_PERSONS = 'SAVE_PERSONS';
export const LOAD_STARTED_PERSONS = 'LOAD_STARTED_PERSONS';

export function loadStartedPersons() {
    return {
        type: LOAD_STARTED_PERSONS
    }
}

export function savePersons(data: any) {
    return {
        type: SAVE_PERSONS,
        persons: data
    };
}

export function loadPersons() {
    return function (dispatch: any) {
        dispatch(loadStartedPersons());
        return loadStarWarsData(RESOURCES.person.plural)
            .then((data: any) => dispatch(savePersons(data)));
    };
}