import { GACitizen } from './GACitizen';
export declare class GA<T extends GACitizen> {
    fitness: number;
    fittest: GACitizen;
    generationCount: number;
    mutationRate: number;
    survivalRate: number;
    private fitnessFunction;
    private population;
    constructor(fitnessFunction: (a: T) => number);
    add(citizen: T): void;
    reset(): void;
    sort(): void;
    evolve(): void;
    private breed(a, b);
    private mutate(a);
}
