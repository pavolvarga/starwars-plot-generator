import { RESOURCES } from "../common/common";
import { loadVehicles } from "./vehicle";
import {loadSpecies, REVERT_LOAD_SPECIES} from "./species";
import { loadStarships } from "./starship";
import { loadPersons } from "./person";
import { loadPlanets } from "./planet";

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


export function selectLoadActionCreator(resourceName: string) {
    switch (resourceName) {
        case RESOURCES.person.singular:
            return loadPersons;
        case RESOURCES.planet.singular:
            return loadPlanets;
        case RESOURCES.vehicle.singular:
            return loadVehicles;
        case RESOURCES.species.singular:
            return loadSpecies;
        case RESOURCES.starship.singular:
            return loadStarships;
        default:
            throw new Error(`Unknown resource ${resourceName}`);
    }
}
