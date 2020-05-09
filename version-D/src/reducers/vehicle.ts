import { InputState } from "../common/types";
import { initialFormState } from "./reducer";
import { LOAD_STARTED_VEHICLES, SAVE_VEHICLES, TOGGLE_VEHICLE_VISIBLE } from "../actions/vehicle";

function loadStartedVehicles(vehicle: InputState): InputState {
    return {
        ...vehicle,
        loadingInProgress: true
    };
}

function saveVehicles(vehicle: InputState, vehiclesData: any): InputState {
    return {
        ...vehicle,
        loadingInProgress: false,
        data: vehiclesData
    };
}

function toggleVehicleVisible(vehicle: InputState): InputState {
    return {
        ...vehicle,
        visible: !vehicle.visible
    }
}

export function reducerVehicle(vehicle: InputState = initialFormState.species, action: any): InputState {
    switch (action.type) {
        case LOAD_STARTED_VEHICLES:
            return loadStartedVehicles(vehicle);
        case SAVE_VEHICLES:
            return saveVehicles(vehicle, action.persons);
        case TOGGLE_VEHICLE_VISIBLE:
            return toggleVehicleVisible(vehicle);
        default:
            return vehicle;
    }
}
