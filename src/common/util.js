import { STAR_WARS_API } from "./const";

function starWarsResource(name) {
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
function createPages(resource, totalCount, retrievedItemsCount) {

    if (totalCount === retrievedItemsCount) {
        return [];
    }

    const
        pages = [],
        pagesCount = Math.floor(totalCount / retrievedItemsCount) + 1;

    let i = 2;

    while( i <= pagesCount) {
        pages.push(`${resource}?page=${i}`);
        i += 1;
    }

    return pages;
}

/**
 * Fetches all data for a resource.
 *
 * @param resource - resource
 * @param resolve - resolve function
 * @param reject - reject function
 */
function loadStarWarsResource(resource, resolve, reject) {

    let firstPage;

    //TODO: Promise.all rejects when first promise rejects - find better solution

    //TODO: Refactor into smaller helper functions

    fetch(resource)
        .then(response => response.json())
        .then(data => {
            const {results, count} = data;
            firstPage = results;
            return createPages(resource, count, results.length);
        })
        .then(pages => Promise.all(pages.map(page => fetch(page))))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => data.map(value => value.results))
        .then(data => {
            data.unshift(firstPage);
            return data;
        })
        .then(data => [].concat.apply([], data))
        .then(data => data.map(obj => {
            return {name: obj.name, url: obj.url};
        }))
        .then(names => names.sort())
        .then(resolve)
        .catch(reject);
}

function loadStarWarsData(name, loadedFn) {
    loadStarWarsResource(starWarsResource(name), loadedFn);
}

export { starWarsResource, createPages, loadStarWarsData };

