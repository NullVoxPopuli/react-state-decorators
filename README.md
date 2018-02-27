# React State Decorators
Taking State management out of `render()`.

## Example

```js
import React from 'react';
import { tracked, gt } from 'react-state-decorators';

export default class MyComponent extends Component {
    @tracked numberField;
    @gt('numberField', 0) greaterThanZero;

    render() {
        const { numberField, greaterThanZero } = this.state;

        return (
            <div>
                {numberField} is > 0? -- {greaterThanZero ? 'yes' : 'no'}
            </div>
        );
    }
}
```

### Demo (Typescript)
https://codesandbox.io/s/v3jm0lpl00

### Demo (Javascript)


## Available Decorators

- `tracked`
- `gt`
- `isEmpty`
- `readonly`
TODO: documentation for each