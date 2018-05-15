/**
 * GA Citizen
 *      Any class which implements this interface can be evolved via the GA process
 */
export interface GACitizen {

	/**
	 * The main method of Evolution - creating children
	 * through reproduction with another citizen
	 */
	mateWith(other: GACitizen): GACitizen;

	/**
	 * The random mutation function
	 */
	mutate(mutationRate: number): void;
}

/**
 * Abstract implementation of the GACitizen Interface
 */
export abstract class AbstractGACitizen implements GACitizen {
	mateWith(other: GACitizen): GACitizen { return null; }
	mutate(mutationRate: number) {}
}
