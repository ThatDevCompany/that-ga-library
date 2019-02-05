/**
 * GA Service
 *      Any class which handles all of the domain specific functions of the GA process
 */
export interface GAService<T> {
	/**
	 * The main method of Evolution - creating children
	 * by mating two citizens (of type T)
	 */
	mate(a: T, b: T): T

	/**
	 * Mutate a citizen (of type T) by a specific mutationRate
	 */
	mutate(citizen: T, mutationRate?: number): T

	/**
	 * The fitness function, what is the fitness of a given citizen (of type T)
	 */
	fitness: (citizen: T, ...args: any[]) => number
}

/**
	The GA class provides the evolutionary framework for
	evolving citizens to reach a higher and higher level
	of fitness.
 */
export class GA<T> {
	// Constructor
	//      calcFitness - provide a measure (0 - 1) of how well a citizen performs
	constructor(private ga: GAService<T>) {
		this.reset()
	}

	// The current generation
	generation: number = 0

	// The mutation rate for the evolutionary process
	//      A numeric value between 0 and 1
	//      (i.e. what proportion of a citizen's genotype will mutate)
	mutationRate: number = 0.01

	// The survival rate for the evolutionary process
	//      A numeric value between 0 and 1
	//      (i.e. what proportion of the generation will survive into the next generation)
	survivalRate: number = 0.1

	// The current population of citizens in the gene pool
	private _population: Array<T> = []
	set population(v: Array<T>) {
		this._population = [].concat(v)
	}
	get population(): Array<T> {
		return this._population
	}

	// The fitness of the current fittest citizen
	//      (based on the fact that the population is sorted by descending fitness)
	get fitness(): number {
		return this._population.length ? this.ga.fitness(this._population[0]) : 0
	}

	// The current fittest citizen within the population
	//      (based on the fact that the population is sorted by descending fitness)
	get fittest(): T {
		return this._population.length ? this._population[0] : null
	}

	// Clear the evolutionary process
	reset() {
		this._population = []
		this.generation = 0
	}

	// Sort the population by the fitness of the citizens
	sort() {
		this._population.sort((a: T, b: T) => {
			return this.ga.fitness(b) - this.ga.fitness(a)
		})
	}

	// Run the evolutionary process for a single generation
	evolve() {
		let nextPopulation: Array<T> = []
		let populationSize = this._population.length

		// Create Breeding Pool
		let breeders: Array<T> = []
		this._population.forEach((citizen: T, idx: number) => {
			// The fitter the citizen, the more often they appear in the breeders array
			for (let i = 0; i < populationSize - idx; i++) {
				breeders.push(citizen)
			}
		})

		// Keep the Best
		let noToKeep = Math.ceil(populationSize * this.survivalRate)
		nextPopulation = nextPopulation.concat(this._population.slice(0, noToKeep))

		// Breed the Rest
		for (let i = 0; i < populationSize - noToKeep; i++) {
			nextPopulation.push(
				this.ga.mutate(
					this.ga.mate(
						breeders[Math.floor(Math.random() * breeders.length)],
						breeders[Math.floor(Math.random() * breeders.length)]
					),
					this.mutationRate
				)
			)
		}

		// Complete
		this._population = nextPopulation

		// Sort
		this.sort()

		// Done
		this.generation++
	}
}
