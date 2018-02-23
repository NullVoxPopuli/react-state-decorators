import * as React from 'react';

declare interface IDecoratorArgs extends Array<any|string|PropertyDescriptor>{
  0: any, // no idea what 'target' is. always empty object when logged.
  1: string, 
  2: PropertyDescriptor
}

declare type TrackedArgs = string[];

declare type DecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;


export function tracked<T>(...args: any[]): PropertyDescriptor | DecoratorType {
  if (typeof args[0] === 'string') {
    return track as DecoratorType;
  }

  return track.call(null, ...args as IDecoratorArgs);
}

// target: any, propertyKey: string, descriptor: PropertyDescriptor
function track(this: React.Component, ...args: any[]): PropertyDescriptor {
  const [target, propertyKey, descriptor] = args;

  return {
    configurable: true,
    enumerable: false,
    set: function(this: React.Component, newValue: any) {
      this.setState({ [propertyKey]: newValue });
    },
    get: function(this: React.Component): any {
      // 'any' hack.. :-(
      // this.state doesn't have an index signature in typescript
      return (this.state as any)[propertyKey];
    }
  }
}
