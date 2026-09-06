import { ProductComponent } from './product.component';

describe('ProductComponent isOutOfStock (golden WU)', () => {
  function createCmp(product: any, selectedVariantId: string | null = null) {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = product;
    (cmp as any).selectedVariantId = selectedVariantId;
    return cmp;
  }

  it('is false without a product or when backorders are allowed', () => {
    expect(createCmp(null).isOutOfStock()).toBe(false);
    expect(
      createCmp({ stock_quantity: 0, allow_backorder: true, variants: [] }).isOutOfStock(),
    ).toBe(false);
  });

  it('uses variant stock when present and treats null variant stock as in-stock', () => {
    const product = {
      stock_quantity: 0,
      allow_backorder: false,
      variants: [
        { id: 'v1', stock_quantity: 0 },
        { id: 'v2', stock_quantity: null },
      ],
    };
    expect(createCmp(product, 'v1').isOutOfStock()).toBe(true);
    expect(createCmp(product, 'v2').isOutOfStock()).toBe(false);
    expect(createCmp({ stock_quantity: 0, allow_backorder: false, variants: [] }).isOutOfStock()).toBe(
      true,
    );
  });
});
