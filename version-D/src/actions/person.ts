import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";
import { loadFailed, loadStarted, save } from "./actions";

export const SAVE_PERSON = 'SAVE_PERSON';
export const LOAD_STARTED_PERSON = 'LOAD_STARTED_PERSON';
export const SET_SELECTED_PERSON = 'SET_SELECTED_PERSON';
export const LOAD_PERSON_FAILED = 'LOAD_PERSON_FAILED';

export function loadPersons() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.person.singular));
        return loadStarWarsData(RESOURCES.person.plural)
            .then((data: any) => dispatch(save(RESOURCES.person.singular, data)))
            .catch(() => dispatch(loadFailed(RESOURCES.person.singular)));
    }
}
