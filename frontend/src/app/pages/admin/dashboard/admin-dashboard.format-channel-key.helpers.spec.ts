import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent formatChannelKey (golden WU)", () => {
  function bare(): AdminDashboardComponent {
    return Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
  }

  it("replaces underscores or returns em dash", () => {
    const cmp = bare();
    expect(cmp.formatChannelKey("")).toBe("—");
    expect(cmp.formatChannelKey("  ")).toBe("—");
    expect(cmp.formatChannelKey("paid_search")).toBe("paid search");
  });
});
