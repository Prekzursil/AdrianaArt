import { AdminComponent } from "./admin.component";

describe("AdminComponent pageBlockLabel (golden WU)", () => {
  function bare(t: (k: string) => string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).t = t;
    return cmp;
  }

  it("returns translation or raw block type", () => {
    expect(
      bare((k) => (k.endsWith(".hero") ? "Hero" : k)).pageBlockLabel({ type: "hero" } as any),
    ).toBe("Hero");
    expect(bare((k) => k).pageBlockLabel({ type: "custom" } as any)).toBe("custom");
  });
});
