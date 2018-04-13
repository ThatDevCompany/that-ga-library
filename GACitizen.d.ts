export interface GACitizen {
    mateWith: (other: GACitizen) => GACitizen;
    mutate: (mutationRate: number) => void;
}
