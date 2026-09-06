import { AdminThemeComponent } from "./admin-theme.component";

/** Golden WU admin-theme-track-control — trackControl. */
describe("AdminThemeComponent trackControl (golden WU)", () => {
  it("returns control.name", () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    expect((cmp as any).trackControl(0, { name: "primary" })).toBe("primary");
  });
});
