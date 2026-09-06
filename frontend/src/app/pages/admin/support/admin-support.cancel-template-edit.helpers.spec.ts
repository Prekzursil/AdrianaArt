import { AdminSupportComponent } from "./admin-support.component";

/** Golden WU admin-support-cancel-template-edit — cancelTemplateEdit. */
describe("AdminSupportComponent cancelTemplateEdit (golden WU)", () => {
  it("closes form and clears editing id", () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    let open = true;
    (cmp as any).templateFormOpen = { set: (v: boolean) => { open = v; } };
    (cmp as any).templateEditingId = "t1";
    cmp.cancelTemplateEdit();
    expect(open).toBe(false);
    expect((cmp as any).templateEditingId).toBeNull();
  });
});
