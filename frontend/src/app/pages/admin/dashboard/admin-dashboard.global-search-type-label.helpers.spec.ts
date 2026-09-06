import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent globalSearchTypeLabel (golden WU)", () => {
  function bare(instant: (k: string) => string): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("translates global search type keys", () => {
    const cmp = bare((k) => (k.endsWith(".order") ? "Order" : k));
    expect(cmp.globalSearchTypeLabel("order" as any)).toBe("Order");
  });
});
