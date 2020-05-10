import { FAILED_LOAD_COOL_DOWN, RESOURCES } from "../common/common";
import { loadStarWarsData } from "../common/load-data";
import { ResourceKey } from "../common/types";

export const RESET_SELECTED_RESOURCES = 'RESET_SELECTED_RESOURCES';

export function loadStarted(resourceName: string) {
    return {
        type: `LOAD_STARTED_${resourceName.toUpperCase()}`
    }
}

export function save(resourceName: string, data: any) {
    return {
        type: `SAVE_${resourceName.toUpperCase()}`,
        data
    };
}

export function loadFailed(resourceName: string) {
    return {
        type: `LOAD_${resourceName.toUpperCase()}_FAILED`
    };
}

export function setSelectedResource(resourceName: string, payload: {name: string, url: string} | undefined) {
    return {
        type: `SET_SELECTED_${resourceName.toUpperCase()}`,
        payload
    }
}

export function toggleResourceVisible(resourceName: string) {
    return {
        type: `TOGGLE_${resourceName.toUpperCase()}_VISIBLE`
    }
}

export function resetSelectedResources() {
    return {
        type: RESET_SELECTED_RESOURCES
    }
}

export function revertLoad(resourceName: string) {
    return {
        type: `REVERT_LOAD_${resourceName.toUpperCase()}`
    };
}

export function load(resourceName: string, clearAfterFailure: boolean) {
    return function (dispatch: any) {
        dispatch(loadStarted(resourceName));
        return loadStarWarsData(RESOURCES[resourceName as ResourceKey].plural)
            .then((data: any) => dispatch(save(resourceName, data)))
            .catch(() => {
                dispatch(loadFailed(resourceName));
                if (clearAfterFailure) {
                    //clear alert after specified time, and allow user to try it again
                    setTimeout(() => dispatch(revertLoad(resourceName)), FAILED_LOAD_COOL_DOWN * 1000);
                }
            });
    }
}
