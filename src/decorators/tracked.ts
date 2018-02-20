import * as React from 'react';

export function tracked(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    set: function(this: React.Component, newValue: any) {
      this.setState({ [propertyKey]: newValue });
    },
    get: function(this: React.Component): any {
      return this.state[propertyKey];
    }
  }
}
