import { ComputedProperty } from "./computed-property";

export function runUpdates(
  context: React.Component,
  tracker: PropertyTracker,
  computedProperty: ComputedProperty
) {
  const { name } = computedProperty;
  const toUpdate = tracker.propertiesToUpdate[name] || [];

  // re-compute values for each dependent property
  toUpdate.forEach((property: any) => {
    if (property.descriptorValue) {
      // re-apply the decorated function
      context[property.name] = property.descriptorValue.apply(context);
      return;
    }

    if (property.transform) {
      // retrieve value from context, and pass to transform
      const value = context[name]; // dependent property

      context[property.name] = property.transform(value);
      return;
    }

    // default
    context[property] = context[property];
  });
}

export class PropertyTracker {
  // TODO: change to map to ComputedPropertyList
  public propertiesToUpdate: {
    [propertyName: string]: ComputedProperty[];
  } = {};

  private componentClass: any;

  constructor(component: any) {
    this.componentClass = component;
  }

  public track(dependent: ComputedProperty, dependsOn: string | string[]) {
    const properties = Array.isArray(dependsOn) ? dependsOn : [dependsOn];

    properties.forEach(property => {
      const dependents = this.propertiesToUpdate[property];
      this.propertiesToUpdate[property] = dependents || [];

      if (!this.propertiesToUpdate[property].includes(dependent)) {
        this.propertiesToUpdate[property].push(dependent);
      }
    });
  }
}

// Because we're adding a property to
// a component, we can't use it's type.
export function ensurePropertyTracker(component: any): PropertyTracker {
  if (component === undefined) {
    // this shouldn't happen... :-\
    throw "Component Not Defined. Cannot create decorator...";
  }

  if (!component.__propertyTracker) {
    component.__propertyTracker = new PropertyTracker(component);
  }

  return component.__propertyTracker;
}
