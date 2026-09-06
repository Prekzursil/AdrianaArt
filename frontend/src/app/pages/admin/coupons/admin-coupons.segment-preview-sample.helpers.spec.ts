import { AdminCouponsComponent } from "./admin-coupons.component";

describe("AdminCouponsComponent segmentPreviewSample (golden WU)", () => {
  function bare(assign: any, revoke: any): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).segmentPreviewAssign = () => assign;
    (cmp as any).segmentPreviewRevoke = () => revoke;
    return cmp;
  }

  it("joins up to 6 sample emails with ellipsis", () => {
    expect(bare(null, null).segmentPreviewSample()).toBe("");
    expect(bare({ sample_emails: ["a@x.com", "b@x.com"] }, null).segmentPreviewSample()).toBe(
      "a@x.com, b@x.com",
    );
    const many = Array.from({ length: 8 }, (_, i) => `${i}@x.com`);
    expect(bare({ sample_emails: many }, null).segmentPreviewSample()).toBe(
      "0@x.com, 1@x.com, 2@x.com, 3@x.com, 4@x.com, 5@x.com…",
    );
  });
});
