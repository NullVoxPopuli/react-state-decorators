import { makeDecoratorWithTrackedProperties } from "./helpers";

export const readonly = makeDecoratorWithTrackedProperties([], null, {
  configurable: false
});
