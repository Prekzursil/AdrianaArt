import { ProductComponent } from './product.component';

/** Golden WU product-is-sold-out — isSoldOut. */
describe('ProductComponent isSoldOut (golden WU)', () => {
  function createCmp(product: any, selectedVariantId?: string) {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = product;
    (cmp as any).selectedVariantId = selectedVariantId;
    return cmp;
  }

  it('returns false without product or when backorder allowed', () => {
    expect(createCmp(null).isSoldOut()).toBe(false);
    expect(
      createCmp({ stock_quantity: 0, allow_backorder: true, variants: [] }).isSoldOut(),
    ).toBe(false);
  });

  it('uses variant stock when present and treats null variant stock as in stock', () => {
    const product = {
      stock_quantity: 0,
      allow_backorder: false,
      variants: [
        { id: 'v1', stock_quantity: 0 },
        { id: 'v2', stock_quantity: null },
      ],
    };
    expect(createCmp(product, 'v1').isSoldOut()).toBe(true);
    expect(createCmp(product, 'v2').isSoldOut()).toBe(false);
    expect(createCmp({ stock_quantity: 0, allow_backorder: false, variants: [] }).isSoldOut()).toBe(
      true,
    );
  });
});
