import { loadStarWarsData } from "../common/load-data";
import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";
import { loadFailed, loadStarted, revertLoad, save } from "./actions";

export const SAVE_VEHICLE = 'SAVE_VEHICLE';
export const TOGGLE_VEHICLE_VISIBLE = 'TOGGLE_VEHICLE_VISIBLE';
export const LOAD_STARTED_VEHICLE = 'LOAD_STARTED_VEHICLE';
export const LOAD_VEHICLE_FAILED = 'LOAD_VEHICLE_FAILED';
export const SET_SELECTED_VEHICLE = 'SET_SELECTED_VEHICLE';
export const REVERT_LOAD_VEHICLES = 'REVERT_LOAD_VEHICLES';

export function loadVehicles() {
    return function (dispatch: any) {
        dispatch(loadStarted(RESOURCES.vehicle.singular));
        return loadStarWarsData(RESOURCES.vehicle.plural)
            .then((data: any) => dispatch(save(RESOURCES.vehicle.singular, data)))
            .catch(() => {
                dispatch(loadFailed(RESOURCES.vehicle.singular));
                //clear alert after specified time, and allow user to try it again
                setTimeout(() => dispatch(revertLoad(RESOURCES.vehicle.singular)), FAILED_LOAD_COOL_DOWN * 1000);
            });
    };
}
