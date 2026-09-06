import { AdminThemeComponent } from "./admin-theme.component";

/** Golden WU admin-theme-track-version — trackVersion. */
describe("AdminThemeComponent trackVersion (golden WU)", () => {
  it("returns version.version", () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    expect((cmp as any).trackVersion(0, { version: 7 })).toBe(7);
  });
});
