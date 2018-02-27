import { makeDecorator } from "./helpers";

function greaterThan(compareTo: number) {
  return (value: number) => value > compareTo;
}

export const gt = (property: string, compareTo: number) => {
  return makeDecorator(greaterThan(compareTo))(property);
};
