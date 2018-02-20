import * as React from 'react';

class TrackedTest extends React.Component {
  @tracked property: string;

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