import { loadStarWarsData } from "../common/load-data";
import { RESOURCES } from "../common/common";

export const SAVE_VEHICLES = 'SAVE_VEHICLES';
export const LOAD_STARTED_VEHICLES = 'LOAD_STARTED_VEHICLES';

export function loadStartedVehicles() {
    return {
        type: LOAD_STARTED_VEHICLES
    }
}

export function saveVehicles(data: any) {
    return {
        type: SAVE_VEHICLES,
        vehicle: data
    };
}

export function loadVehicles() {
    return function (dispatch: any) {
        dispatch(loadStartedVehicles());
        return loadStarWarsData(RESOURCES.vehicle.plural)
            .then((data: any) => dispatch(saveVehicles(data)));
    };
}
