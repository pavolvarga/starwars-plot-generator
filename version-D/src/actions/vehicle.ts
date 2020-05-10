import { loadStarWarsData } from "../common/load-data";
import {FAILED_LOAD_COOL_DOWN, RESOURCES} from "../common/common";

export const TOGGLE_VEHICLE_VISIBLE = 'TOGGLE_VEHICLE_VISIBLE';
export const SAVE_VEHICLES = 'SAVE_VEHICLES';
export const LOAD_STARTED_VEHICLES = 'LOAD_STARTED_VEHICLES';
export const LOAD_VEHICLES_FAILED = 'LOAD_VEHICLES_FAILED';
export const SET_SELECTED_VEHICLE = 'SET_SELECTED_VEHICLE';
export const REVERT_LOAD_VEHICLES = 'REVERT_LOAD_VEHICLES';

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

function revertLoadVehicles() {
    return {
        type: REVERT_LOAD_VEHICLES
    };
}

export function loadVehicles() {
    return function (dispatch: any) {
        dispatch(loadStartedVehicles());
        return loadStarWarsData(RESOURCES.vehicle.plural)
            .then((data: any) => dispatch(saveVehicles(data)))
            .catch(() => {
                dispatch(loadVehiclesFailed());
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadVehicles()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}
