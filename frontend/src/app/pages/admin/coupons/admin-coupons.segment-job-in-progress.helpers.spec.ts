import { AdminCouponsComponent } from "./admin-coupons.component";

describe("AdminCouponsComponent segmentJobInProgress (golden WU)", () => {
  function bare(status: string | null): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).segmentJob = () => (status ? { status } : null);
    return cmp;
  }

  it("is true for pending/running only", () => {
    expect(bare(null).segmentJobInProgress()).toBe(false);
    expect(bare("pending").segmentJobInProgress()).toBe(true);
    expect(bare("running").segmentJobInProgress()).toBe(true);
    expect(bare("succeeded").segmentJobInProgress()).toBe(false);
    expect(bare("failed").segmentJobInProgress()).toBe(false);
  });
});
