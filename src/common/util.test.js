import { starWarsResource, createPages } from './util';

describe('star wars resource', () => {
    it('should create correct url', () => {
        const result = starWarsResource('people');
        expect(result).toEqual('https://swapi.co/api/people/');
    });
});

describe('create pages', () => {
   it('should create correct list of pages', () => {
       const
           result = createPages('https://swapi.co/api/people/', 7, 2),
           expected = ['https://swapi.co/api/people/?page=2', 'https://swapi.co/api/people/?page=3', 'https://swapi.co/api/people/?page=4'];
       expect(result).toEqual(expected);
   });
    it('should return empty array when there are no more items to be fetched', () => {
        const result = createPages('https://swapi.co/api/people/', 5, 5);
        expect(result).toEqual([]);
    });
});

//TODO: write tests for fetching all data
