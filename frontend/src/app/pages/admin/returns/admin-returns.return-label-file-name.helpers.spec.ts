import { AdminReturnsComponent } from "./admin-returns.component";

describe("AdminReturnsComponent returnLabelFileName (golden WU)", () => {
  function bare(selected: string, instant: (k: string) => string): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (cmp as any).returnLabelSelectedName = () => selected;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("prefers selected name, else translated empty label", () => {
    expect(bare("picked.pdf", () => "No file").returnLabelFileName()).toBe("picked.pdf");
    expect(bare("", () => "No file").returnLabelFileName()).toBe("No file");
  });
});
