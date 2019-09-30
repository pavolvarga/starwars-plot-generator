import {Resource, ResourceKey, Resources} from "./types";

const STAR_WARS_API = 'https://swapi.co/api';

const RESOURCE_PEOPLE: Resource = { plural: 'people', singular: 'person', mandatory: true, label: 'character'};
const RESOURCE_PLANETS: Resource = { plural: 'planets', singular: 'planet', mandatory: true, label: undefined};
const RESOURCE_STARSHIPS: Resource = {plural: 'starships', singular: 'starship', mandatory: false, label: undefined};
const RESOURCE_VEHICLES: Resource = {plural: 'vehicles', singular: 'vehicle', mandatory: false, label: undefined};
const RESOURCE_SPECIES: Resource = {plural: 'species', singular: 'species', mandatory: false, label: undefined};

const RESOURCES: Resources = {
    person: RESOURCE_PEOPLE,
    planet: RESOURCE_PLANETS,
    starship: RESOURCE_STARSHIPS,
    vehicle: RESOURCE_VEHICLES,
    species: RESOURCE_SPECIES
};

function getPluralName(singular: string): string {
    return Object
        .values(RESOURCES)
        .filter(r => (r.singular === singular))[0].plural;
}

type predicateType = (r: Resource) => boolean;

const mandatoryPredicate: predicateType = (resource: Resource) => resource.mandatory;
const optionalPredicate: predicateType = (resource: Resource) => !resource.mandatory;

function getSingularResourceName(predicate: predicateType) {
    return Object
        .values(RESOURCES)
        .filter(predicate)
        .map(r => r.singular);
}

const getResourceNames = () => (Object.keys(RESOURCES) as ResourceKey[]);
const getMandatoryResourceNames = () => (getSingularResourceName(mandatoryPredicate) as ResourceKey[]);
const getOptionalResourceNames = () => (getSingularResourceName(optionalPredicate) as ResourceKey[]);

/**
 * If load of an optional resource fails, prevent user from trying again util specific amount of seconds.
 */
const FAILED_LOAD_COOL_DOWN = 5;

export { STAR_WARS_API, RESOURCES, FAILED_LOAD_COOL_DOWN, getPluralName, getMandatoryResourceNames, getOptionalResourceNames, getResourceNames };
