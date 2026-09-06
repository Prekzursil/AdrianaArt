import { AdminCouponsComponent } from "./admin-coupons.component";

describe("AdminCouponsComponent segmentCandidatesCount (golden WU)", () => {
  function bare(assign: any, revoke: any, job: any): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).segmentPreviewAssign = () => assign;
    (cmp as any).segmentPreviewRevoke = () => revoke;
    (cmp as any).segmentJob = () => job;
    return cmp;
  }

  it("prefers assign preview, then revoke, then job", () => {
    expect(bare({ total_candidates: 3 }, { total_candidates: 9 }, { total_candidates: 1 }).segmentCandidatesCount()).toBe(3);
    expect(bare(null, { total_candidates: 9 }, { total_candidates: 1 }).segmentCandidatesCount()).toBe(9);
    expect(bare(null, null, { total_candidates: 1 }).segmentCandidatesCount()).toBe(1);
    expect(bare(null, null, null).segmentCandidatesCount()).toBe(0);
  });
});
