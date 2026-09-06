import { CartComponent } from './cart.component';

/** Golden WU cart-save-key — saveKey. */
describe('CartComponent saveKey (golden WU)', () => {
  it('joins product_id and variant_id', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    expect(cmp.saveKey({ product_id: 'p1', variant_id: 'v1' } as any)).toBe('p1::v1');
    expect(cmp.saveKey({ product_id: 'p1', variant_id: '' } as any)).toBe('p1::');
    expect(cmp.saveKey({ product_id: 'p1', variant_id: null } as any)).toBe('p1::');
  });
});
