import * as React from 'react';

export function tracked(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  return {
    set: function(this: React.Component, newValue: any) {
      this.setState({ [name]: newValue });
    },
    get: function(this: React.Component): any {
      return this.state[name];
    }
  }
}
