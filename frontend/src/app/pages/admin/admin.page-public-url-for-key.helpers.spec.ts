import { AdminComponent } from "./admin.component";

describe("AdminComponent pagePublicUrlForKey (golden WU)", () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it("maps special pages and encodes slug", () => {
    const cmp = bare();
    expect(cmp.pagePublicUrlForKey("page.about")).toBe("/about");
    expect(cmp.pagePublicUrlForKey("page.contact")).toBe("/contact");
    expect(cmp.pagePublicUrlForKey("page.")).toBe("/pages");
    expect(cmp.pagePublicUrlForKey("page.foo bar")).toBe("/pages/foo%20bar");
  });
});
