import { AdminContentSchedulingComponent } from "./admin-content-scheduling.component";

/** Golden WU admin-content-track-row — trackRow. */
describe("AdminContentSchedulingComponent trackRow (golden WU)", () => {
  it("returns row.key", () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    expect(cmp.trackRow(0, { key: "home.publish" } as any)).toBe("home.publish");
  });
});
