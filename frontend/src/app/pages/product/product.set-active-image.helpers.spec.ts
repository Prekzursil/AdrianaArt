import { ProductComponent } from './product.component';

/** Golden WU product-set-active-image — setActiveImage. */
describe('ProductComponent setActiveImage (golden WU)', () => {
  it('assigns activeImageIndex', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).activeImageIndex = 0;
    cmp.setActiveImage(3);
    expect((cmp as any).activeImageIndex).toBe(3);
  });
});
