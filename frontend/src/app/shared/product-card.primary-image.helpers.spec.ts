import { ProductCardComponent } from './product-card.component';

/** Golden WU product-card-primary-image — primaryImage. */
describe('ProductCardComponent primaryImage (golden WU)', () => {
  it('picks the lowest sort_order image or a placeholder', () => {
    const cmp = Object.create(ProductCardComponent.prototype) as ProductCardComponent;
    Object.assign(cmp as any, { product: { images: [] } });
    expect(cmp.primaryImage).toBe('assets/placeholder/product-placeholder.svg');
    Object.assign(cmp as any, {
      product: {
        images: [
          { url: 'b.jpg', sort_order: 5 },
          { url: 'a.jpg', sort_order: 1 },
          { url: 'c.jpg', sort_order: 3 },
        ],
      },
    });
    expect(cmp.primaryImage).toBe('a.jpg');
  });
});
