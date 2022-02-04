declare const weighted: (min: number, max: number) => number;

declare const Random_weighted: typeof weighted;
declare namespace Random {
  export {
    Random_weighted as weighted,
  };
}

export { Random as R, weighted as w };
