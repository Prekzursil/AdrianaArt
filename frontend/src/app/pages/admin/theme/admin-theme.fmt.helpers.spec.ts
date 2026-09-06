import { AdminThemeComponent } from "./admin-theme.component";

/** Golden WU theme-fmt — fmt. */
describe("AdminThemeComponent fmt (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
  }

  it("rounds WCAG ratio to one decimal", () => {
    const cmp = createCmp();
    expect((cmp as any).fmt(4.567)).toBe(4.6);
    expect((cmp as any).fmt(4.54)).toBe(4.5);
    expect((cmp as any).fmt(0)).toBe(0);
  });
});
