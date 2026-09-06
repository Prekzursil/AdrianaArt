import { AdminThemeComponent } from "./admin-theme.component";

/** Golden WU admin-theme-publish-disabled — publishDisabled. */
describe("AdminThemeComponent publishDisabled (golden WU)", () => {
  it("is true when busy, dirty, or contrast failures", () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    (cmp as any).busy = () => false;
    (cmp as any).dirty = () => false;
    (cmp as any).hasContrastFailures = () => false;
    expect(cmp.publishDisabled).toBe(false);
    (cmp as any).busy = () => true;
    expect(cmp.publishDisabled).toBe(true);
    (cmp as any).busy = () => false;
    (cmp as any).dirty = () => true;
    expect(cmp.publishDisabled).toBe(true);
    (cmp as any).dirty = () => false;
    (cmp as any).hasContrastFailures = () => true;
    expect(cmp.publishDisabled).toBe(true);
  });
});
