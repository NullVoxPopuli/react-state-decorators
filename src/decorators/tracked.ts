import * as React from 'react';

export function tracked(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    set: function(this: React.Component, newValue: any) {
      this.setState({ [propertyKey]: newValue });
    },
    get: function(this: React.Component): any {
      // 'any' hack.. :-(
      // this.state doesn't have an index signature in typescript
      return (<any>this.state)[propertyKey];
    }
  }
}
