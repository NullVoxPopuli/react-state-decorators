import { makeDecorator } from "./helpers";

function checkEmpty(value: any) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    value === [] ||
    value === {}
  );
}

export const isEmpty = (property: string) => {
  return makeDecorator(checkEmpty)(property);
};
