import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { SWAResult } from './types';

const STAR_WARS_API = 'https://swapi.dev/api';
const DELAY = 250;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private createPages(resource: string, totalCount: number, retrievedItemsCount: number): string[] {

    function calculatePageCount(total: number, current: number): number {
      if ((total % current === 0)) {
        return total / current
      }
      return Math.floor(total / current) + 1;
    }

    if (totalCount === retrievedItemsCount) {
      return [];
    }

    const
      pages: string[] = [],
      pagesCount: number = calculatePageCount(totalCount, retrievedItemsCount);

    let i: number = 1;

    while( i <= pagesCount) {
      pages.push(`${STAR_WARS_API}/${resource}/?page=${i}`);
      i += 1;
    }

    return pages;
  }

  loadStarWarsData(name: string) {
    const url = `${STAR_WARS_API}/${name}/`

    return this.httpClient
      .get(url)
      .pipe(
        delay(DELAY),
        switchMap((response: any) => {
          const { count, results } = response;
          return from(this.createPages(name, count, results.length));
        }),
        concatMap((url: string) => {
          return this.httpClient
            .get(url)
            .pipe(
              delay(DELAY)
            );
        }),
        map((res: any) => {
          return res.results
            .map((obj: SWAResult) => ({name: obj.name, url: obj.url}));
        }),
      )
  }

}
