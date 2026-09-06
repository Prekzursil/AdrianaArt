import { ProductComponent } from "./product.component";

/** Golden WU product-wishlisted — wishlisted. */
describe("ProductComponent wishlisted (golden WU)", () => {
  it("false without product; else wishlist.isWishlisted", () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = null;
    (cmp as any).wishlist = { isWishlisted: () => true };
    expect(cmp.wishlisted).toBe(false);
    (cmp as any).product = { id: "p1" };
    (cmp as any).wishlist = { isWishlisted: (id: string) => id === "p1" };
    expect(cmp.wishlisted).toBe(true);
    (cmp as any).wishlist = { isWishlisted: () => false };
    expect(cmp.wishlisted).toBe(false);
  });
});
