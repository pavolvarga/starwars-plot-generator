import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import { LOAD_STARTED_VEHICLES, SAVE_VEHICLES } from "../actions/vehicle";

function loadStartedVehicles(vehicles: InputState): InputState {
    return {
        ...vehicles,
        loadingInProgress: true
    };
}

function saveVehicles(vehicles: InputState, speciesData: any): InputState {
    return {
        ...vehicles,
        loadingInProgress: false,
        data: speciesData
    };
}

export function reducerSpecies(species: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_VEHICLES:
            return loadStartedVehicles(species);
        case SAVE_VEHICLES:
            return saveVehicles(species, action.persons);
        default:
            return species;
    }
}
