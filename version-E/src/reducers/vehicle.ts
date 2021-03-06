import {InputState, Suggestion} from "../common/types";
import { initialFormState } from "./reducer";
import {
    LOAD_STARTED_VEHICLE,
    LOAD_VEHICLE_FAILED, REVERT_LOAD_VEHICLES,
    SAVE_VEHICLE,
    SET_SELECTED_VEHICLE,
    TOGGLE_VEHICLE_VISIBLE
} from "../actions/vehicle";

function loadStartedVehicles(vehicle: InputState): InputState {
    return {
        ...vehicle,
        loadingInProgress: true
    };
}

function saveVehicles(vehicle: InputState, data: any): InputState {
    return {
        ...vehicle,
        loadingInProgress: false,
        data
    };
}

function toggleVehicleVisible(vehicle: InputState): InputState {
    return {
        ...vehicle,
        visible: !vehicle.visible
    }
}

function loadVehiclesFailed(vehicle: InputState): InputState {
    return {
        ...vehicle,
        loadingInProgress: false,
        loadFailed: true
    };
}

function setSelectedVehicle(vehicle: InputState, payload: Suggestion | undefined): InputState {
    return {
        ...vehicle,
        selected: payload
    };
}

function revertLoadVehicles(vehicle: InputState): InputState {
    return {
        ...vehicle,
        visible: false,
        loadFailed: false
    };
}

export function reducerVehicle(vehicle: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_VEHICLE:
            return loadStartedVehicles(vehicle);
        case SAVE_VEHICLE:
            return saveVehicles(vehicle, action.data);
        case SET_SELECTED_VEHICLE:
            return setSelectedVehicle(vehicle, action.payload);
        case TOGGLE_VEHICLE_VISIBLE:
            return toggleVehicleVisible(vehicle);
        case LOAD_VEHICLE_FAILED:
            return loadVehiclesFailed(vehicle);
        case REVERT_LOAD_VEHICLES:
            return revertLoadVehicles(vehicle);
        default:
            return vehicle;
    }
}
