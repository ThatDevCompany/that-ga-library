import {GACitizen} from './GACitizen';

/*
	The GA class provides the evolutionary framework for
	evolving citizens to reach a higher and higher level
	of fitness.
 */
export class GA {

	// Constructor
	//      calcFitness - provide a measure (0 - 1) of how well a citizen performs
	constructor(
		private calcFitness: (citizen: GACitizen) => number
	) {
		this.reset();
	}

	// The fitness of the current fittest citizen
	//      (based on the fact that the population is sorted by descending fitness)
	get fitness(): number {
		return this.population.length ? this.calcFitness(this.population[0]) : 0;
	}

	// The current fittest citizen within the population
	//      (based on the fact that the population is sorted by descending fitness)
	get fittest(): GACitizen {
		return this.population.length ? this.population[0] : null;
	}

	// The current generation
	generation: number = 0;

	// The mutation rate for the evolutionary process
	//      A numeric value between 0 and 1
	//      (i.e. what proportion of a citizen's genotype will mutate)
	mutationRate: number = 0.01;

	// The survival rate for the evolutionary process
	//      A numeric value between 0 and 1
	//      (i.e. what proportion of the generation will survive into the next generation)
	survivalRate: number = 0.1;

	// The current population of citizens in the gene pool
	private population: Array<GACitizen> = [];

	// Add a citizen to our population
	add(citizen: GACitizen) {
		this.population.push(citizen);
	}

	// Clear the evolutionary process
	reset() {
		this.population = [];
		this.generation = 0;
	}

	// Sort the population by the fitness of the citizens
	sort() {
		this.population.sort((a: GACitizen, b: GACitizen) => {
			return this.calcFitness(b) - this.calcFitness(a);
		});
	}

	// Run the evolutionary process for a single generation
	evolve() {
		let nextPopulation: Array<GACitizen> = [];
		let populationSize = this.population.length;

		// Create Breeding Pool
		let breeders: Array<GACitizen> = [];
		this.population.forEach((citizen: GACitizen, idx: number) => {
			Array(populationSize - idx).forEach(() => {
				breeders.push(citizen);
			});
		});

		// Keep the Best
		let noToKeep = Math.ceil(populationSize * this.survivalRate);
		nextPopulation = nextPopulation.concat(this.population.slice(0, noToKeep));

		// Breed the Rest
		for (let i = 0; i < (populationSize - noToKeep); i++) {
			nextPopulation.push(
				this.mutate(
					this.breed(
						breeders[Math.floor(Math.random() * breeders.length)],
						breeders[Math.floor(Math.random() * breeders.length)]
					)
				)
			);
		}

		// Complete
		this.population = nextPopulation;

		// Sort
		this.sort();

		// Done
		this.generation++;
	}

	// Breed citizen A with citizen B
	private breed(a: GACitizen, b: GACitizen): GACitizen {
		return <GACitizen> a.mateWith(b);
	}

	// Mutate citizen A
	private mutate(a: GACitizen): GACitizen {
		a.mutate(this.mutationRate);
		return a;
	}
}
