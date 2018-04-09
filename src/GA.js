"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    The GA class provides the evolutionary framework for
    evolving citizens to reach a higher and higher level
    of fitness.
 */
var GA = /** @class */ (function () {
    // Constructor
    function GA(fitnessFunction) {
        // The current best fitness for the entire population
        this.fitness = 0;
        // The current generation
        this.generationCount = 0;
        // The mutation rate for the evolutionary process
        // (i.e. what proportion of a citizen's genotype will mutate)
        this.mutationRate = 0.01;
        // The survival rate for the evolutionary process
        // (i.e. what proportion of the generation will survive into the next generation)
        this.survivalRate = 0.1;
        // Our current population of citizens
        this.population = [];
        this.fitnessFunction = fitnessFunction;
        this.reset();
    }
    // Add a citizen to our population
    GA.prototype.add = function (citizen) {
        this.population.push(citizen);
    };
    // Clear the evolutionary process
    GA.prototype.reset = function () {
        this.population = [];
        this.generationCount = 0;
        this.fitness = 0;
    };
    // Sort the population by the fitness of the citizens
    GA.prototype.sort = function () {
        var _this = this;
        this.population.sort(function (a, b) {
            return _this.fitnessFunction(b) - _this.fitnessFunction(a);
        });
    };
    // Run the evolutionary process for a single generation
    GA.prototype.evolve = function () {
        var nextPopulation = [];
        var populationSize = this.population.length;
        // Create Breeding Pool
        var breeders = [];
        this.population.forEach(function (citizen, idx) {
            breeders = breeders.concat(Array(populationSize - idx).fill(citizen));
        });
        // Keep the Best
        var noToKeep = Math.ceil(populationSize * this.survivalRate);
        nextPopulation = nextPopulation.concat(this.population.slice(0, noToKeep));
        // Breed the Rest
        for (var i = 0; i < (populationSize - noToKeep); i++) {
            nextPopulation.push(this.mutate(this.breed(breeders[Math.floor(Math.random() * breeders.length)], breeders[Math.floor(Math.random() * breeders.length)])));
        }
        // Complete
        this.population = nextPopulation;
        // Sort
        this.sort();
        // Calc New Fitness
        this.fitness = this.population.length ? this.fitnessFunction(this.population[0]) : 0;
        this.fittest = this.population.length ? this.population[0] : null;
        this.generationCount++;
    };
    // Breed citizen A with citizen B
    GA.prototype.breed = function (a, b) {
        return a.mateWith(b);
    };
    // Mutate citizen A
    GA.prototype.mutate = function (a) {
        a.mutate(this.mutationRate);
        return a;
    };
    return GA;
}());
exports.GA = GA;
