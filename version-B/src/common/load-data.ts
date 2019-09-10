import { STAR_WARS_API } from "./const";

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

function starWarsResource(name: string): string {
    return `${STAR_WARS_API}/${name}/`;
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
function createPages(resource: string, totalCount: number, retrievedItemsCount: number): string[] {

    if (totalCount === retrievedItemsCount) {
        return [];
    }

    const
        pages: string[] = [],
        pagesCount: number = Math.floor(totalCount / retrievedItemsCount) + 1;

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

type ResourceData = {name: string, url: string};
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
 * @param resolve - resolve function
 * @param reject - reject function
 */
function loadStarWarsResource(resource: string, resolve: any, reject: any): void {

    fetch(resource)
        .then(response => response.json())
        .then(firstRequestResponse => createRequestUrlsAndSaveFirstResults(firstRequestResponse, resource))
        .then(readAllPages)
        .then(convertAllResponsesToJson)
        .then(data => data.map((value: SWAResourceResp) => value.results))
        .then(flat)
        .then(extractValues)
        .then(names => names.sort())
        .then(resolve)
        .catch(reject);
}

type ResolveFn = (data: ResourceData ) => void;
type RejectFn = (err: Error) => void;
function loadStarWarsData(name: string, resolve: ResolveFn, reject: RejectFn): void {
    loadStarWarsResource(starWarsResource(name), resolve, reject);
}

export { starWarsResource, createPages, loadStarWarsData };