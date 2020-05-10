import { InputState, Suggestion } from "../common/types";
import { LOAD_PERSONS_FAILED, LOAD_STARTED_PERSON, SAVE_PERSONS, SET_SELECTED_PERSON } from "../actions/person";
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
        data: persons,
        visible: true
    };
}

function setSelectedPerson(person: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...person,
        selected: payload
    };
}

function loadPersonsFailed(person: InputState): InputState {
    return {
        ...person,
        loadingInProgress: false,
        loadFailed: true
    };
}

export function reducerPerson(person: InputState = initialFormState.person, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_PERSON:
            return loadStartedPersons(person);
        case SAVE_PERSONS:
            return savePersons(person, action.persons);
        case SET_SELECTED_PERSON:
            return setSelectedPerson(person, action.payload);
        case LOAD_PERSONS_FAILED:
            return loadPersonsFailed(person);
        default:
            return person;
    }
}
