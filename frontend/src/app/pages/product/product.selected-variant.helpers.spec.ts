import { ProductComponent } from './product.component';

describe('ProductComponent selectedVariant (golden WU)', () => {
  it('returns matching variant, else first, else null', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).selectedVariantId = 'b';
    expect((cmp as any).selectedVariant({ variants: [] })).toBeNull();
    expect(
      (cmp as any).selectedVariant({
        variants: [
          { id: 'a', name: 'A' },
          { id: 'b', name: 'B' },
        ],
      }).id,
    ).toBe('b');
    (cmp as any).selectedVariantId = 'missing';
    expect(
      (cmp as any).selectedVariant({
        variants: [{ id: 'a', name: 'A' }],
      }).id,
    ).toBe('a');
  });
});
