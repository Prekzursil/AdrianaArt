import { AdminComponent } from "./admin.component";

/** Golden WU admin-is-blog-selected — isBlogSelected. */
describe("AdminComponent isBlogSelected (golden WU)", () => {
  it("checks blogBulkSelection set", () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogBulkSelection = new Set(["a", "b"]);
    expect(cmp.isBlogSelected("a")).toBe(true);
    expect(cmp.isBlogSelected("z")).toBe(false);
  });
});
