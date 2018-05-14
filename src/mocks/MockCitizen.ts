import {GACitizen} from '../GACitizen';

/**
 * Mock Citizen
 *      A mock class for testing the GA
 */
export class MockCitizen implements GACitizen {

	constructor(
		public fitness: number = Math.random() * 100000
	) {}

	mateWith (other: MockCitizen): MockCitizen {
		return new MockCitizen((this.fitness + other.fitness) / 2);
	}

	mutate (mutationRate: number): void {
		if (Math.random() < mutationRate) {
			this.fitness += Math.random() * 0.1;
		}
	}
}
