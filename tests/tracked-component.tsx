import * as React from "react";

import { tracked, gt, readonly, isEmpty } from "./decorators";

declare interface IProps {}

declare interface IState {
  textField: string;
  numberField: number;
  double?: number;
  gtZero?: boolean;
  readOnlyField: string;
  textFieldIsEmpty: boolean;
}

export default class TrackedComponent extends React.Component<IProps, IState> {
  @tracked numberField: number;
  @tracked textField: string;

  @isEmpty("textField") textFieldIsEmpty;

  @readonly readOnlyField: string; // this can't be set.

  @gt("numberField", 0)
  gtZero: boolean;

  @tracked("numberField")
  double(): number {
    return this.numberField * 2;
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      numberField: 0,
      textField: "",
      readOnlyField: "readonly",
      textFieldIsEmpty: true
    };
  }

  increment = () => (this.numberField += 1);
  decrement = () => (this.numberField -= 1);

  didInputText = (e: React.FormEvent<HTMLInputElement>) => {
    this.textField = e.currentTarget.value;
  };

  render() {
    const {
      numberField,
      gtZero,
      textField,
      double,
      textFieldIsEmpty
    } = this.state;

    console.log("[Render] ", this.state, this.__propertyTracker);

    return (
      <div>
        <pre>src/tracked-components.ts</pre>
        <br />
        <table>
          <tbody>
            <tr>
              <td className="property">{numberField}</td>
              <td>* 2 ==</td>
              <td className="property">{double}</td>
              <td>&gt; 0 ==</td>
              <td className="property">{gtZero ? "yes" : "no"}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>numberField</th>
              <th />
              <th>double</th>
              <td />
              <th>gtZero</th>
            </tr>
          </tfoot>
        </table>

        <button onClick={this.increment}> Increment </button>
        <button onClick={this.decrement}> Decrement </button>

        <br />
        <br />

        <h3>someField: {textField}</h3>
        <h6>textFieldIsEmpty: {textFieldIsEmpty ? "yes" : "no"}</h6>
        <input value={textField} onChange={this.didInputText} />
      </div>
    );
  }
}
