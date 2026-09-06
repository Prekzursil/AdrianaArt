import { AdminComponent } from "./admin.component";

describe("AdminComponent isPageHidden (golden WU)", () => {
  function bare(pages: Array<{ key: string; hidden?: boolean }>): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).contentPages = pages;
    return cmp;
  }

  it("reads hidden flag for page keys only", () => {
    const cmp = bare([{ key: "page.about", hidden: true }, { key: "page.contact", hidden: false }]);
    expect(cmp.isPageHidden("" as any)).toBe(false);
    expect(cmp.isPageHidden("page.about" as any)).toBe(true);
    expect(cmp.isPageHidden("page.contact" as any)).toBe(false);
    expect(cmp.isPageHidden("page.missing" as any)).toBe(false);
  });
});
