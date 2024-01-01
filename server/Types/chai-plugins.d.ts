import "chai";

declare module "chai" {
  interface Deep {
    equalInAnyOrder(value: any): Assertion;
  }
}
