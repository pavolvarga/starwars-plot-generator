import { InputState, Suggestion } from "../common/types";
import {
    LOAD_PERSON_FAILED,
    LOAD_STARTED_PERSON,
    REVERT_LOAD_PERSON,
    SAVE_PERSON,
    SET_SELECTED_PERSON,
    TOGGLE_PERSON_VISIBLE
} from "../actions/person";
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

function togglePersonVisible(person: InputState): InputState {
    return {
        ...person,
        visible: !person.visible
    };
}

function revertLoadPerson(person: InputState): InputState {
    return {
        ...person,
        visible: false,
        loadFailed: false
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
        case LOAD_PERSON_FAILED:
            return loadPersonsFailed(person);
        case TOGGLE_PERSON_VISIBLE:
            return togglePersonVisible(person);
        case REVERT_LOAD_PERSON:
            return revertLoadPerson(person);
        default:
            return person;
    }
}
