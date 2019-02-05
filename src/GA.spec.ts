import { GA, GAService } from './GA'

/**
 * TestCitizen
 */
export class TestCitizen {
	constructor(public fitness: number = 0.6) {}
}

/**
 * TestGAService
 *      A test instance of a GAService
 */
export class TestGAService implements GAService<TestCitizen> {
	mate(a: TestCitizen, b: TestCitizen): TestCitizen {
		return new TestCitizen()
	}

	mutate(item: TestCitizen, mutationRate: number): TestCitizen {
		return new TestCitizen()
	}

	fitness(citizen: TestCitizen) {
		return 1 - Math.abs(citizen.fitness - 0.6)
	}
}

describe('GA', () => {
	let ga: GA<TestCitizen>
	let gaService: GAService<TestCitizen>
	let citizens = [
		new TestCitizen(0.75),
		new TestCitizen(0.59),
		new TestCitizen(0.25)
	]
	beforeEach(() => {
		gaService = new TestGAService()
		ga = new GA<TestCitizen>(gaService)
	})

	it('should be instantiable', () => {
		expect(ga).toBeDefined()
	})

	it('should have a ZERO FITNESS when theres no population', () => {
		expect(ga.fitness).toEqual(0)
	})

	it('should make a copy of the array', () => {
		ga.population = citizens
		ga.sort()
		expect(ga.population[0]).toEqual(citizens[1])
	})

	it('should have the FITNESS of the population (once sorted)', () => {
		ga.population = citizens
		ga.sort()
		expect(ga.fitness).toEqual(gaService.fitness(citizens[1]))
	})

	it('should have a NULL FITTEST when theres no population', () => {
		expect(ga.fittest).toEqual(null)
	})

	it('should return the FITTEST citizen within the population (once sorted)', () => {
		ga.population = citizens
		ga.sort()
		expect(ga.fittest).toEqual(citizens[1])
	})

	it('should evolve', () => {
		ga.reset()
		for (let i = 0; i < 100; i++) {
			ga.population.push(new TestCitizen(Math.random()))
		}
		for (let i = 0; i < 1000; i++) {
			ga.evolve()
		}
		expect(ga.fitness).toEqual(1)
	})
})
