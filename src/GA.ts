import {GACitizen} from './GACitizen';

/*
	The GA class provides the evolutionary framework for
	evolving citizens to reach a higher and higher level
	of fitness.
 */
export class GA<T extends GACitizen> {

	// The current best fitness for the entire population
	fitness: number = 0;

	// The current fittest citizen within the population
	fittest: GACitizen;

	// The current generation
	generationCount: number = 0;

	// The mutation rate for the evolutionary process
	// (i.e. what proportion of a citizen's genotype will mutate)
	mutationRate: number = 0.01;

	// The survival rate for the evolutionary process
	// (i.e. what proportion of the generation will survive into the next generation)
	survivalRate: number = 0.1;

	// How do we record the fitness of a citizen
	private fitnessFunction: (a: T) => number;

	// Our current population of citizens
	private population: Array<T> = [];

	// Constructor
	constructor(fitnessFunction: (a: T) => number) {
		this.fitnessFunction = fitnessFunction;
		this.reset();
	}

	// Add a citizen to our population
	add(citizen: T) {
		this.population.push(citizen);
	}

	// Clear the evolutionary process
	reset() {
		this.population = [];
		this.generationCount = 0;
		this.fitness = 0;
	}

	// Sort the population by the fitness of the citizens
	sort() {
		this.population.sort((a: T, b: T) => {
			return this.fitnessFunction(b) - this.fitnessFunction(a);
		});
	}

	// Run the evolutionary process for a single generation
	evolve() {
		let nextPopulation: Array<T> = [];
		let populationSize = this.population.length;

		// Create Breeding Pool
		let breeders: Array<T> = [];
		this.population.forEach((citizen: T, idx: number) => {
			breeders = breeders.concat(Array(populationSize - idx).fill(citizen));
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

		// Calc New Fitness
		this.fitness = this.population.length ? this.fitnessFunction(this.population[0]) : 0;
		this.fittest = this.population.length ? this.population[0] : null;
		this.generationCount++;
	}

	// Breed citizen A with citizen B
	private breed(a: T, b: T): T {
		return <T> a.mateWith(b);
	}

	// Mutate citizen A
	private mutate(a: T): T {
		a.mutate(this.mutationRate);
		return a;
	}
}
