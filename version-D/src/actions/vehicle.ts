import { loadStarWarsData } from "../common/load-data";
import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";
import { loadStarted, save } from "./actions";

export const SAVE_VEHICLE = 'SAVE_VEHICLE';
export const TOGGLE_VEHICLE_VISIBLE = 'TOGGLE_VEHICLE_VISIBLE';
export const LOAD_STARTED_VEHICLE = 'LOAD_STARTED_VEHICLE';
export const LOAD_VEHICLES_FAILED = 'LOAD_VEHICLES_FAILED';
export const SET_SELECTED_VEHICLE = 'SET_SELECTED_VEHICLE';
export const REVERT_LOAD_VEHICLES = 'REVERT_LOAD_VEHICLES';

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
        dispatch(loadStarted(RESOURCES.vehicle.singular));
        return loadStarWarsData(RESOURCES.vehicle.plural)
            .then((data: any) => dispatch(save(RESOURCES.vehicle.singular, data)))
            .catch(() => {
                dispatch(loadVehiclesFailed());
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoadVehicles()), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}
