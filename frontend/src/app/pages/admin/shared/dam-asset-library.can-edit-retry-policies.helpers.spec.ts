import { DamAssetLibraryComponent } from "./dam-asset-library.component";

/** Golden WU dam-can-edit-retry-policies — canEditRetryPolicies. */
describe("DamAssetLibraryComponent canEditRetryPolicies (golden WU)", () => {
  it("allows owner/admin only", () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    (cmp as any).auth = { role: () => "owner" };
    expect(cmp.canEditRetryPolicies()).toBe(true);
    (cmp as any).auth = { role: () => "Admin" };
    expect(cmp.canEditRetryPolicies()).toBe(true);
    (cmp as any).auth = { role: () => "support" };
    expect(cmp.canEditRetryPolicies()).toBe(false);
  });
});
