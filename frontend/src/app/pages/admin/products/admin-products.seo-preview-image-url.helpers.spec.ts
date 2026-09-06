import { AdminProductsComponent } from "./admin-products.component";

describe("AdminProductsComponent seoPreviewImageUrl (golden WU)", () => {
  function bare(images: unknown): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).images = () => images;
    return cmp;
  }

  it("returns first image url or null", () => {
    expect(bare([{ url: " https://cdn/x.jpg " }]).seoPreviewImageUrl()).toBe(" https://cdn/x.jpg ");
    expect(bare([{ url: "   " }]).seoPreviewImageUrl()).toBeNull();
    expect(bare([]).seoPreviewImageUrl()).toBeNull();
    expect(bare(undefined).seoPreviewImageUrl()).toBeNull();
  });
});
