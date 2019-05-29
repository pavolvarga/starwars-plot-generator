
const STAR_WARS_API = 'https://swapi.co/api';

const RESOURCE_PEOPLE = {plural: 'people', singular: 'person', mandatory: true};
const RESOURCE_PLANETS = {plural: 'planets', singular: 'planet', mandatory: true};
const RESOURCE_STARSHIPS = {plural: 'starships', singular: 'starship', mandatory: false};
const RESOURCE_VEHICLES = {plural: 'vehicles', singular: 'vehicle', mandatory: false};
const RESOURCE_SPECIES = {plural: 'species', singular: 'species', mandatory: false};

const RESOURCES = {
    PEOPLE: RESOURCE_PEOPLE,
    PLANETS: RESOURCE_PLANETS,
    STARSHIPS: RESOURCE_STARSHIPS,
    VEHICLES: RESOURCE_VEHICLES,
    SPECIES: RESOURCE_SPECIES
};

const OPTIONAL_RESOURCES = Object.values(RESOURCES).filter(r => !r.mandatory);

export { STAR_WARS_API, RESOURCES, OPTIONAL_RESOURCES };
