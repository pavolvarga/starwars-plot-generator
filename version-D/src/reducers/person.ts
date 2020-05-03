import { InputState } from "../common/types";
import { LOAD_STARTED_PERSONS, SAVE_PERSONS } from "../actions/person";
import { initialFormState } from "./reducer";

function loadStartedPersons(person: InputState): InputState {
    return {
        ...person,
        loadingInProgress: true
    };
}

function savePersons(person: InputState, persons: any): InputState {
    return {
        ...person,
        loadingInProgress: false,
        data: persons
    };
}

export function reducerPerson(person: InputState = initialFormState.person, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_PERSONS:
            return loadStartedPersons(person);
        case SAVE_PERSONS:
            return savePersons(person, action.persons);
        default:
            return person;
    }
}
