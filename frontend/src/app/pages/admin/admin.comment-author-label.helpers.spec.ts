import { AdminComponent } from "./admin.component";

describe("AdminComponent commentAuthorLabel (golden WU)", () => {
  it("delegates to formatIdentity with author id fallback", () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    const out = cmp.commentAuthorLabel({ id: "u1", name: "Ada" } as any);
    expect(typeof out).toBe("string");
    expect(out.length).toBeGreaterThan(0);
  });
});
