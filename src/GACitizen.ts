/**
 * GA Citizen
 *      Any class which implements this interface can be evolved via the GA process
 */
export interface GACitizen {

    /**
     * The main method of Evolution - creating children
     * through reproduction with another citizen
     */
    mateWith: (other: GACitizen) => GACitizen;

    /**
     * The random mutation function
     */
    mutate: (mutationRate: number) => void;
}
