import { AdminReturnsComponent } from "./admin-returns.component";

describe("AdminReturnsComponent returnLabelFileName (golden WU)", () => {
  function bare(name: string, file: File | null): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (cmp as any).returnLabelSelectedName = signalish(name);
    (cmp as any).returnLabelFile = file;
    return cmp;
  }

  function signalish(v: string) {
    return () => v;
  }

  it("returns selected name or file name or empty", () => {
    const withSelected = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (withSelected as any).returnLabelSelectedName = () => "picked.pdf";
    (withSelected as any).returnLabelFile = null;
    expect(withSelected.returnLabelFileName()).toBe("picked.pdf");

    const withFile = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (withFile as any).returnLabelSelectedName = () => "";
    (withFile as any).returnLabelFile = new File(["x"], "label.pdf");
    expect(withFile.returnLabelFileName()).toBe("label.pdf");

    const empty = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (empty as any).returnLabelSelectedName = () => "";
    (empty as any).returnLabelFile = null;
    expect(empty.returnLabelFileName()).toBe("");
  });
});
