import {RESOURCES} from "../common/common";
import { loadVehicles } from "./vehicle";
import { loadSpecies } from "./species";
import { loadStarships } from "./starship";
import { loadPersons } from "./person";
import { loadPlanets } from "./planet";

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
