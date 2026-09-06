import { DamAssetLibraryComponent } from "./dam-asset-library.component";

/** Golden WU dam-is-retry-policy-history-open — isRetryPolicyHistoryOpen. */
describe("DamAssetLibraryComponent isRetryPolicyHistoryOpen (golden WU)", () => {
  it("checks retryPolicyHistoryOpen set", () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    (cmp as any).retryPolicyHistoryOpen = () => new Set(["thumb"]);
    expect(cmp.isRetryPolicyHistoryOpen("thumb" as any)).toBe(true);
    expect(cmp.isRetryPolicyHistoryOpen("optimize" as any)).toBe(false);
  });
});
