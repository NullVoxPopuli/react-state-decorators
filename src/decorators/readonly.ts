import { makeDecoratorWithTrackedProperties } from "./helpers";

export const readonly = makeDecoratorWithTrackedProperties(
  [], 
  undefined, 
  { configurable: false }
);
