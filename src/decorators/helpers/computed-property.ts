import { Transform } from "./types";

export class ComputedProperty {
  public name: string;
  public transform?: Transform;

  // descriptor.value will be a function if specified as
  // @decorator
  // functionName() {...}
  public descriptor: PropertyDescriptor;
  public descriptorValue: () => any;

  constructor(
    propertyName: string,
    oldDescriptorValue: any,
    transform?: Transform
  ) {
    this.name = propertyName;
    this.transform = transform;
    this.descriptorValue = oldDescriptorValue;
  }

  public get(context: any) {
    const value = context.state[this.name];

    if (this.descriptorValue) return this.descriptorValue.apply(this);
    if (this.transform) return this.transform(value);

    return value;
  }
}
