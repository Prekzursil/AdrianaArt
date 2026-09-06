import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent fraudReviewStatus (golden WU)", () => {
  function bare(tags: any): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => (tags === undefined ? null : { tags });
    return cmp;
  }

  it("reads fraud tags from order", () => {
    expect(bare(undefined).fraudReviewStatus()).toBeNull();
    expect(bare([]).fraudReviewStatus()).toBeNull();
    expect(bare(["fraud_approved"]).fraudReviewStatus()).toBe("approved");
    expect(bare(["x", "FRAUD_DENIED"]).fraudReviewStatus()).toBe("denied");
  });
});
