import { starWarsResource, createPages } from './load-data';

describe('star wars resource', () => {
    it('should create correct url', () => {
        const result = starWarsResource('people');
        expect(result).toStrictEqual('https://swapi.dev/api/people/');
    });
});

describe('create pages', () => {
   it('should create correct list of pages', () => {
       const
           result = createPages('https://swapi.co/api/people/', 7, 2),
           expected = [
               'https://swapi.co/api/people/?page=1',
               'https://swapi.co/api/people/?page=2',
               'https://swapi.co/api/people/?page=3',
               'https://swapi.co/api/people/?page=4'
           ];
       expect(result).toStrictEqual(expected);
   });
   it('should create correct list of pages', () => {
       const
           result = createPages('https://swapi.co/api/people/', 82, 10),
           expected = [
               'https://swapi.co/api/people/?page=1',
               'https://swapi.co/api/people/?page=2',
               'https://swapi.co/api/people/?page=3',
               'https://swapi.co/api/people/?page=4',
               'https://swapi.co/api/people/?page=5',
               'https://swapi.co/api/people/?page=6',
               'https://swapi.co/api/people/?page=7',
               'https://swapi.co/api/people/?page=8',
               'https://swapi.co/api/people/?page=9'
           ];
       expect(result).toStrictEqual(expected);
   });
   it('should create correct list of pages', () => {
       const
           result = createPages('https://swapi.co/api/people/', 60, 10),
           expected = [
               'https://swapi.co/api/people/?page=1',
               'https://swapi.co/api/people/?page=2',
               'https://swapi.co/api/people/?page=3',
               'https://swapi.co/api/people/?page=4',
               'https://swapi.co/api/people/?page=5',
               'https://swapi.co/api/people/?page=6'
           ];
       expect(result).toStrictEqual(expected);
   });

   it('should return empty array when there are no more items to be fetched', () => {
       const result = createPages('https://swapi.co/api/people/', 5, 5);
       expect(result).toStrictEqual([]);
   });
});
