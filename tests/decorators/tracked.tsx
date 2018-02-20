import * as React from 'react';

import { tracked } from '../../src/decorators/tracked';

declare interface IProps {};

declare interface IState {
  property: string,
  someNumber: number
};

class TrackedTest extends React.Component<IProps, IState> {
  @tracked
  property = '';

  @tracked
  someNumber = 0;

  @tracked('property')
  get trackedGetter() {
    return this.property + ' hi';
  }

  // @tracked('someNumber')
  computedNumber = {
    get(this: TrackedTest): number {
      return this.someNumber;
    },
    set(this: TrackedTest, newValue: number): void {
      this.someNumber = newValue;
    } 
  }

  componentDidMount() {
    this.property = 'did mount';
  }

  render() {
    const { property } = this.state;
    
    return (
      <div>{property}</div>
    );
  }
}