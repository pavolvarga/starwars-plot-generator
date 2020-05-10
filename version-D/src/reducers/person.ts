import { InputState, Suggestion } from "../common/types";
import { LOAD_PERSONS_FAILED, LOAD_STARTED_PERSON, SAVE_PERSON, SET_SELECTED_PERSON } from "../actions/person";
import { initialFormState } from "./reducer";

function loadStartedPersons(person: InputState): InputState {
    return {
        ...person,
        loadingInProgress: true
    };
}

function savePersons(person: InputState, data: any): InputState {
    return {
        ...person,
        loadingInProgress: false,
        data,
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
        case SAVE_PERSON:
            return savePersons(person, action.data);
        case SET_SELECTED_PERSON:
            return setSelectedPerson(person, action.payload);
        case LOAD_PERSONS_FAILED:
            return loadPersonsFailed(person);
        default:
            return person;
    }
}
