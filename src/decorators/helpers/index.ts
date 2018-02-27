import { ensurePropertyTracker, runUpdates } from "./property-tracker";
import { DecoratorType, IDecoratorArgs } from "../_types";
import { ComputedProperty } from "./computed-property";
import { Transform } from "./types";

// fn is a transforming function that will be evaluated on the
// watched property.
// by default, it'll just return the value.
// this allows us to do things like:
//
// @gt('property', 0) isGreaterThanZero;
// @isEmpty('arrayOfStuff') isStuffEmpty;
export const makeDecorator = (fn?: Transform) => {
  return makeDecoratorWithTransform(fn);
};

const makeDecoratorWithTransform = (fn?: Transform) => {
  return (...args: any[]): PropertyDescriptor | DecoratorType => {
    if (typeof args[0] === "string") {
      return makeDecoratorWithTrackedProperties(args, fn) as DecoratorType;
    }

    return makeDecoratorWithTrackedProperties([], fn).call(
      null,
      ...(args as IDecoratorArgs)
    );
  };
};

export const makeDecoratorWithTrackedProperties = (
  dependsOnProperties: string[],
  transform?: Transform,
  options: PropertyDescriptor = {}
): DecoratorType => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const oldDescriptorValue = descriptor && descriptor.value;
    // on the class, we'll keep track of what properties need updating
    const propertyTracker = ensurePropertyTracker(target);

    const computedProperty = new ComputedProperty(
      propertyKey,
      oldDescriptorValue,
      transform
    );

    propertyTracker.track(computedProperty, dependsOnProperties);

    const setter = function(newValue: any) {
      this.setState({ [propertyKey]: newValue }, () => {
        runUpdates(this, propertyTracker, computedProperty);
      });
    };

    const getter = function(): any {
      return computedProperty.get(this);
    };

    setter.bind(target);
    getter.bind(target);

    const newDescriptor = {
      configurable: true,
      enumerable: false,
      ...options,
      set: setter,
      get: getter
    };

    return newDescriptor;
  };
};
