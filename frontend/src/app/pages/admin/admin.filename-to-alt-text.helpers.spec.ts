import { AdminComponent } from "./admin.component";

describe("AdminComponent filenameToAltText (golden WU)", () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it("normalizes filename into alt text", () => {
    const cmp = bare() as any;
    expect(cmp.filenameToAltText("hero_image-01.PNG")).toBe("hero image 01");
    expect(cmp.filenameToAltText("   ")).toBe("Image");
    expect(cmp.filenameToAltText("a".repeat(100)+".jpg").length).toBe(80);
  });
});
