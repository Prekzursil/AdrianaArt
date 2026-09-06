import { ProductComponent } from './product.component';

/** Golden WU product-on-images-change — onImagesChange. */
describe('ProductComponent onImagesChange (golden WU)', () => {
  it('updates product.images when product set; resets activeImageIndex', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = { images: [{ url: 'old' }] };
    (cmp as any).activeImageIndex = 2;
    cmp.onImagesChange([{ url: 'new' }]);
    expect((cmp as any).product.images).toEqual([{ url: 'new' }]);
    expect((cmp as any).activeImageIndex).toBe(0);
    const prev = (cmp as any).product.images;
    cmp.onImagesChange(null as any);
    expect((cmp as any).product.images).toBe(prev);
    (cmp as any).product = null;
    cmp.onImagesChange([{ url: 'x' }]);
    expect((cmp as any).product).toBeNull();
  });
});
