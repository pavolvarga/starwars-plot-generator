import type { Resource, Resources } from './types';

const STAR_WARS_API = 'https://swapi.dev/api';

type SWAResourceResp = {
    previous?: string,
    next?: string,
    results: SWAResult[],
    count: number
};
type SWAResult = {
    name: string,
    url: string,
    [key: string]: any
}
export function starWarsResource(name: string): string {
    return `${STAR_WARS_API}/${name}/`;
}
function calculatePageCount(total: number, current: number): number {
    if ((total % current === 0)) {
        return total / current
    }
    return Math.floor(total / current) + 1;
}

/**
 * Creates an array of urls for fetching paged data
 *
 * @param resource - and resource url
 * @param totalCount - how many items are available
 * @param retrievedItemsCount - how many items have been retrieved with the first fetch
 *                              (we are assuming that all subsequent calls but the last one will retrieve same amout)
 * @returns {Array} - arrays of urls for fetching all items
 */
export function createPages(resource: string, totalCount: number, retrievedItemsCount: number): string[] {

    if (totalCount === retrievedItemsCount) {
        return [];
    }

    const
        pages: string[] = [],
        pagesCount: number = calculatePageCount(totalCount, retrievedItemsCount);

    let i: number = 1;

    while( i <= pagesCount) {
        pages.push(`${resource}?page=${i}`);
        i += 1;
    }

    return pages;
}

/**
 * Given list of urls, fetch data from all urls
 */
function readAllPages(pages: string[]): Promise<any> {
    return Promise.all(pages.map(page => fetch(page)));
}

/**
 * Extract json from all responses
 */
function convertAllResponsesToJson(responses: any[]): Promise<SWAResourceResp[]> {
    return Promise.all(responses.map(res => res.json()));
}

/**
 * Reads paging data from the first response.
 * From the paging data it creates a list of urls to fetch all available data form the resource.
 *
 * @param firstRequestResponse - a response to the first request
 * @param resource - a resource's url to page through
 * @returns {Array} - a list of urls to fetch from
 */
function createRequestUrlsAndSaveFirstResults(firstRequestResponse: SWAResourceResp, resource: string): string[] {
    const {results, count} = firstRequestResponse;
    return createPages(resource, count, results.length);
}
export type ResourceData = {name: string, url: string};
function extractValues(data: SWAResult[]): ResourceData[] {
    return data.map((obj: SWAResult) => {
        return {name: obj.name, url: obj.url};
    });
}

/**
 * Flat an array of arrays into an array.
 */
function flat(data: SWAResult[][]): SWAResult[] {
    return ([] as SWAResult[]).concat.apply([], data);
}

/**
 * Fetches all data for a resource.
 *
 * @param resource - resource
 */
function loadStarWarsResource(resource: string): any {

    return fetch(resource)
        .then(response => response.json())
        .then(firstRequestResponse => createRequestUrlsAndSaveFirstResults(firstRequestResponse, resource))
        .then(readAllPages)
        .then(convertAllResponsesToJson)
        .then(data => data.map((value: SWAResourceResp) => value.results))
        .then(flat)
        .then(extractValues)
        .then(names => names.sort())
}
export async function loadStarWarsData(): Resources | Error {

  const resources: Resources = {
    person:   { plural: 'people',    singular: 'person',   mandatory: true,  label: 'character', suggestions: null, },
    planet:   { plural: 'planets',   singular: 'planet',   mandatory: true,  label: null, suggestions: null  },
    starship: { plural: 'starships', singular: 'starship', mandatory: false, label: null, suggestions: null  },
    vehicle:  { plural: 'vehicles',  singular: 'vehicle',  mandatory: false, label: null, suggestions: null  },
    species:  { plural: 'species',   singular: 'species',  mandatory: false, label: null, suggestions: null  }
  };

  const data = await Promise.all(
    Object.values(resources).map((r: Resource) => r.plural).map(name => loadStarWarsResource(starWarsResource(name)))
  ).catch(error => error);

  if (data instanceof Error) {
    return data;
  }

  Object.values(resources).forEach((r: Resource, i: number) => {
    r.suggestions = data[i];
  })

  return resources;
}
