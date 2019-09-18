import { Resource } from "./types";

const STAR_WARS_API = 'https://swapi.co/api';

const RESOURCE_PEOPLE: Resource = {plural: 'people', singular: 'person', mandatory: true};
const RESOURCE_PLANETS: Resource = {plural: 'planets', singular: 'planet', mandatory: true};
const RESOURCE_STARSHIPS: Resource = {plural: 'starships', singular: 'starship', mandatory: false};
const RESOURCE_VEHICLES: Resource = {plural: 'vehicles', singular: 'vehicle', mandatory: false};
const RESOURCE_SPECIES: Resource = {plural: 'species', singular: 'species', mandatory: false};

const RESOURCES = {
    PEOPLE: RESOURCE_PEOPLE,
    PLANETS: RESOURCE_PLANETS,
    STARSHIPS: RESOURCE_STARSHIPS,
    VEHICLES: RESOURCE_VEHICLES,
    SPECIES: RESOURCE_SPECIES
};

/**
 * If load of an optional resource fails, prevent user from trying again util specific amount of seconds.
 */
const FAILED_LOAD_COOL_DOWN = 5;

export { STAR_WARS_API, RESOURCES, FAILED_LOAD_COOL_DOWN };
