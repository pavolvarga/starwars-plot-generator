import { STAR_WARS_API } from "./const";

function starWarsResource(name) {
    return `${STAR_WARS_API}/${name}/`;
}

function calculatePageCount(total, current) {
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
function createPages(resource, totalCount, retrievedItemsCount) {

    if (totalCount === retrievedItemsCount) {
        return [];
    }

    const
        pages = [],
        pagesCount = calculatePageCount(totalCount, retrievedItemsCount);

    let i = 1;

    while( i <= pagesCount) {
        pages.push(`${resource}?page=${i}`);
        i += 1;
    }

    return pages;
}

/**
 * Given list of urls, fetch data from all urls
 */
function readAllPages(pages) {
    return Promise.all(pages.map(page => fetch(page)));
}

/**
 * Extract json from all responses
 */
function convertAllResponsesToJson(responses) {
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
function createRequestUrlsAndSaveFirstResults(firstRequestResponse, resource) {
    const {results, count} = firstRequestResponse;
    return createPages(resource, count, results.length);
}

function extractValues(data) {
    return data.map(obj => {
        return {name: obj.name, url: obj.url};
    });
}

/**
 * Flat an array of arrays into an array.
 */
function flat(data) {
    return [].concat.apply([], data);
}

/**
 * Fetches all data for a resource.
 *
 * @param resource - resource
 * @param resolve - resolve function
 * @param reject - reject function
 */
function loadStarWarsResource(resource, resolve, reject) {

    fetch(resource)
        .then(response => response.json())
        .then(firstRequestResponse => createRequestUrlsAndSaveFirstResults(firstRequestResponse, resource))
        .then(readAllPages)
        .then(convertAllResponsesToJson)
        .then(data => data.map(value => value.results))
        .then(flat)
        .then(extractValues)
        .then(names => names.sort())
        .then(resolve)
        .catch(reject);
}

function loadStarWarsData(name, resolve, reject) {
    loadStarWarsResource(starWarsResource(name), resolve, reject);
}

export { starWarsResource, createPages, loadStarWarsData };
