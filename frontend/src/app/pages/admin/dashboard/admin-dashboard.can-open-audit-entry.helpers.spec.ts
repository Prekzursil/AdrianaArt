import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-open-audit-entry — canOpenAuditEntry. */
describe("AdminDashboardComponent canOpenAuditEntry (golden WU)", () => {
  it("requires ref_key for product/content; else false", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.canOpenAuditEntry({ entity: "product", ref_key: " slug " } as any)).toBe(true);
    expect(cmp.canOpenAuditEntry({ entity: "product", ref_key: "  " } as any)).toBe(false);
    expect(cmp.canOpenAuditEntry({ entity: "content", ref_key: "home" } as any)).toBe(true);
    expect(cmp.canOpenAuditEntry({ entity: "order", ref_key: "x" } as any)).toBe(false);
  });
});
