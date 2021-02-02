import { Resources } from "./types";

const STAR_WARS_API = 'https://swapi.dev/api';

const RESOURCES: Resources = {
    person:   { plural: 'people',    singular: 'person'   },
    planet:   { plural: 'planets',   singular: 'planet'   },
    starship: { plural: 'starships', singular: 'starship' },
    vehicle:  { plural: 'vehicles',  singular: 'vehicle'  },
    species:  { plural: 'species',   singular: 'species'  }
};

/**
 * If load of an optional resource fails, prevent user from trying again util specific amount of seconds.
 */
const FAILED_LOAD_COOL_DOWN = 5;

export {
    STAR_WARS_API,
    RESOURCES,
    FAILED_LOAD_COOL_DOWN
};
