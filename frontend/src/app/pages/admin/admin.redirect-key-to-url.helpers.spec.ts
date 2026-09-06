import { AdminComponent } from "./admin.component";

describe("AdminComponent redirectKeyToUrl (golden WU)", () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it("maps page keys to /pages urls", () => {
    const cmp = bare();
    expect(cmp.redirectKeyToUrl("page.about")).toBe("/pages/about");
    expect(cmp.redirectKeyToUrl("/custom")).toBe("/custom");
    expect(cmp.redirectKeyToUrl("  ")).toBe("");
  });
});
