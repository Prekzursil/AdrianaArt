import { DamAssetLibraryComponent } from "./dam-asset-library.component";

/** Golden WU dam-cancel-retry-policy-rollback-preview — cancelRetryPolicyRollbackPreview. */
describe("DamAssetLibraryComponent cancelRetryPolicyRollbackPreview (golden WU)", () => {
  it("clears retryPolicyRollbackPreview signal", () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    let val: any = { id: 1 };
    (cmp as any).retryPolicyRollbackPreview = { set: (v: any) => { val = v; } };
    cmp.cancelRetryPolicyRollbackPreview();
    expect(val).toBeNull();
  });
});
