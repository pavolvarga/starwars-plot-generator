import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const TOGGLE_VEHICLE_VISIBLE = 'TOGGLE_VEHICLE_VISIBLE';
export const SAVE_VEHICLES = 'SAVE_VEHICLES';
export const LOAD_STARTED_VEHICLES = 'LOAD_STARTED_VEHICLES';
export const LOAD_VEHICLES_FAILED = 'LOAD_VEHICLES_FAILED';

export function loadStartedVehicles() {
    return {
        type: LOAD_STARTED_VEHICLES
    }
}

export function saveVehicles(data: any) {
    return {
        type: SAVE_VEHICLES,
        vehicles: data
    };
}

function loadVehiclesFailed() {
    return {
        type: LOAD_VEHICLES_FAILED
    };
}

export function loadVehicles() {
    console.log('loadVehicles');
    return function (dispatch: any) {
        console.log('loadVehicles inner');
        dispatch(loadStartedVehicles());
        return loadStarWarsData(RESOURCES.vehicle.plural)
            .then((data: any) => dispatch(saveVehicles(data)))
            .catch(() => dispatch(loadVehiclesFailed()));
    };
}
