
const STAR_WARS_API = 'https://swapi.dev/api';

type Resource = {
    plural: string,
    singular: string,
    mandatory: boolean
};
const RESOURCE_PEOPLE: Resource = {plural: 'people', singular: 'person', mandatory: true};
const RESOURCE_PLANETS: Resource = {plural: 'planets', singular: 'planet', mandatory: true};
const RESOURCE_STARSHIPS: Resource = {plural: 'starships', singular: 'starship', mandatory: false};
const RESOURCE_VEHICLES: Resource = {plural: 'vehicles', singular: 'vehicle', mandatory: false};
const RESOURCE_SPECIES: Resource = {plural: 'species', singular: 'species', mandatory: false};

type Resources = { [key: string]: Resource };
const RESOURCES: Resources = {
    PEOPLE: RESOURCE_PEOPLE,
    PLANETS: RESOURCE_PLANETS,
    STARSHIPS: RESOURCE_STARSHIPS,
    VEHICLES: RESOURCE_VEHICLES,
    SPECIES: RESOURCE_SPECIES
};

const OPTIONAL_RESOURCES: Resource[] = Object.values(RESOURCES).filter(r => !r.mandatory);

/**
 * If load of an optional resource fails, prevent user from trying again util specific amount of seconds.
 */
const FAILED_LOAD_COOL_DOWN = 5;

export { STAR_WARS_API, RESOURCES, OPTIONAL_RESOURCES, FAILED_LOAD_COOL_DOWN };
