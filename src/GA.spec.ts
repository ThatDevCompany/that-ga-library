import {GA} from './GA';
import {GACitizen} from './GACitizen';
import {MockCitizen} from './mocks/MockCitizen';

describe('GA', () => {

	function TestFitnessFunction(citizen: MockCitizen): number {
		return 1 - Math.abs(citizen.fitness - 0.6);
	}

	let ga: GA;
	let mocks = [new MockCitizen(0.75), new MockCitizen(0.59), new MockCitizen(0.25)];
	beforeEach(() => {
		ga = new GA(TestFitnessFunction);
	});

	it('should be instantiable', () => {
		expect(ga).toBeDefined();
	});

	it('should have a ZERO FITNESS when theres no population', () => {
		expect(ga.fitness).toEqual(0);
	});

	it('should make a copy of the array', () => {
		ga.population = mocks;
		ga.sort();
		expect(ga.population[0]).toEqual(mocks[1]);
	});

	it('should have the FITNESS of the population (once sorted)', () => {
		ga.population = mocks;
		ga.sort();
		expect(ga.fitness).toEqual(TestFitnessFunction(mocks[1]));
	});

	it('should have a NULL FITTEST when theres no population', () => {
		expect(ga.fittest).toEqual(null);
	});

	it('should return the FITTEST citizen within the population (once sorted)', () => {
		ga.population = mocks;
		ga.sort();
		expect(ga.fittest).toEqual(mocks[1]);
	});

	it('should evolve', () => {
		ga.reset();
		for (let i = 0; i < 100; i++) {
			ga.population.push(new MockCitizen(Math.random()));
		}
		for (let i = 0; i < 1000; i++) {
			ga.evolve();
		}
		expect(ga.fitness).toEqual(1);
	});


});

