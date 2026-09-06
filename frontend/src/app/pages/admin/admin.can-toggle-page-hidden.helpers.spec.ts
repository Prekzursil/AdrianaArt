import { AdminComponent } from "./admin.component";

describe("AdminComponent canTogglePageHidden (golden WU)", () => {
  function bare(protectedKeys: string[] = []): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).protectedHiddenPageKeys = new Set(protectedKeys);
    return cmp;
  }

  it("allows only non-protected page.* keys", () => {
    const cmp = bare(["page.home"]);
    expect(cmp.canTogglePageHidden("" as any)).toBe(false);
    expect(cmp.canTogglePageHidden("home.sections" as any)).toBe(false);
    expect(cmp.canTogglePageHidden("page.about" as any)).toBe(true);
    expect(cmp.canTogglePageHidden("page.home" as any)).toBe(false);
  });
});
