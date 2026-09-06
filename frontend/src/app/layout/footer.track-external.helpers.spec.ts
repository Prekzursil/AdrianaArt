import { FooterComponent } from "./footer.component";

/** Golden WU footer-track-external — isExternalLink + trackSiteNavLink. */
describe("FooterComponent isExternalLink / trackSiteNavLink (golden WU)", () => {
  function createCmp() {
    return Object.create(FooterComponent.prototype) as FooterComponent;
  }

  it("isExternalLink detects http(s) urls", () => {
    const cmp = createCmp();
    expect(cmp.isExternalLink("https://ex.com")).toBe(true);
    expect(cmp.isExternalLink("http://ex.com")).toBe(true);
    expect(cmp.isExternalLink("/about")).toBe(false);
    expect(cmp.isExternalLink("")).toBe(false);
    expect(cmp.isExternalLink("  ")).toBe(false);
  });

  it("trackSiteNavLink prefers id then url", () => {
    const cmp = createCmp();
    expect(cmp.trackSiteNavLink(0, { id: " a ", url: "/x" } as never)).toBe("a");
    expect(cmp.trackSiteNavLink(0, { id: " ", url: " /y " } as never)).toBe("/y");
    expect(cmp.trackSiteNavLink(0, { id: "", url: "" } as never)).toBe("");
  });
});
