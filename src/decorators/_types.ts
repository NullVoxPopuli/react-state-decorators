export interface IDecoratorArgs
  extends Array<any | string | PropertyDescriptor> {
  0: any; // no idea what 'target' is. always empty object when logged.
  1: string;
  2: PropertyDescriptor;
}

export type DecoratorType = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor;
