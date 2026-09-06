import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU products-sanitize-money — sanitizeMoneyInput. */
describe("AdminProductsComponent sanitizeMoneyInput (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
  }

  function call(raw: string) {
    const cmp = createCmp();
    return (AdminProductsComponent.prototype as any).sanitizeMoneyInput.call(cmp, raw) as {
      clean: string;
      changed: boolean;
    };
  }

  it("strips non-numeric junk and caps fraction digits", () => {
    expect(call("")).toEqual({ clean: "", changed: false });
    expect(call("12.345")).toEqual({ clean: "12.34", changed: true });
    expect(call("\$1,2a.5")).toEqual({ clean: "12.5", changed: true });
    expect(call(".5")).toEqual({ clean: "0.5", changed: true });
    expect(call("10")).toEqual({ clean: "10", changed: false });
  });
});
