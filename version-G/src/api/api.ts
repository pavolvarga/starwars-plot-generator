import { Resource, ResourceKey, Resources } from "./types";

const STAR_WARS_API = 'https://swapi.dev/api';

const RESOURCES: Resources = {
    person:   { plural: 'people',    singular: 'person',   mandatory: true   },
    planet:   { plural: 'planets',   singular: 'planet',   mandatory: true   },
    starship: { plural: 'starships', singular: 'starship', mandatory: false  },
    vehicle:  { plural: 'vehicles',  singular: 'vehicle',  mandatory: false  },
    species:  { plural: 'species',   singular: 'species',  mandatory: false  }
};

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

export {
    STAR_WARS_API,
    RESOURCES,
    FAILED_LOAD_COOL_DOWN,
    getMandatoryResourceNames,
    getOptionalResourceNames,
    getResourceNames,
};
