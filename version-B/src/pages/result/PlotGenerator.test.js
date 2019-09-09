import { generatePlot } from "./PlotGenerator";

describe('generate plot', () => {
    function baseTest(result) {
        expect(result).toBeDefined();
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('description');
    }

    it('description should contain a person and planet', () => {
        const result = generatePlot('person', 'planet');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).not.toMatch(/starship/);
        expect(result.description).not.toMatch(/vehicle/);
        expect(result.description).not.toMatch(/species/);
    });

    it('description should contain a person, planet and starship', () => {
        const result = generatePlot('person', 'planet', 'starship');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).toMatch(/starship/);
        expect(result.description).not.toMatch(/vehicle/);
        expect(result.description).not.toMatch(/species/);
    });

    it('description should contain a person, planet and vehicle', () => {
        const result = generatePlot('person', 'planet', undefined, 'vehicle', undefined);
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).not.toMatch(/starship/);
        expect(result.description).toMatch(/vehicle/);
        expect(result.description).not.toMatch(/species/);
    });

    it('description should contain a person, planet and species', () => {
        const result = generatePlot('person', 'planet', undefined, undefined, 'species');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).not.toMatch(/starship/);
        expect(result.description).not.toMatch(/vehicle/);
        expect(result.description).toMatch(/species/);
    });

    it('description should contain a person, planet, starship and vehicle', () => {
        const result = generatePlot('person', 'planet', 'starship', 'vehicle', undefined);
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).toMatch(/starship/);
        expect(result.description).toMatch(/vehicle/);
        expect(result.description).not.toMatch(/species/);
    });

    it('description should contain a person, planet, starship and vehicle', () => {
        const result = generatePlot('person', 'planet', 'starship', 'vehicle', undefined);
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).toMatch(/starship/);
        expect(result.description).toMatch(/vehicle/);
        expect(result.description).not.toMatch(/species/);
    });

    it('description should contain a person, planet, starship and species', () => {
        const result = generatePlot('person', 'planet', 'starship', undefined, 'species');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).toMatch(/starship/);
        expect(result.description).not.toMatch(/vehicle/);
        expect(result.description).toMatch(/species/);
    });

    it('description should contain a person, planet, vehicle and species', () => {
        const result = generatePlot('person', 'planet', undefined, 'vehicle', 'species');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).not.toMatch(/starship/);
        expect(result.description).toMatch(/vehicle/);
        expect(result.description).toMatch(/species/);
    });

    it('description should contain a person, planet, starship, vehicle and species', () => {
        const result = generatePlot('person', 'planet', 'starship', 'vehicle', 'species');
        baseTest(result);
        expect(result.description).toMatch(/person/);
        expect(result.description).toMatch(/planet/);
        expect(result.description).toMatch(/starship/);
        expect(result.description).toMatch(/vehicle/);
        expect(result.description).toMatch(/species/);
    });
});