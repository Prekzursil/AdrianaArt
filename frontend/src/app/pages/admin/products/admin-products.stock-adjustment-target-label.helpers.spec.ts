import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — stockAdjustmentTargetLabel for variant vs product. */
describe('AdminProductsComponent stockAdjustmentTargetLabel (golden WU)', () => {
  function bare(): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).variants = () => [{ id: 'var-12345678-aaaa', name: 'Large' }];
    (cmp as any).t = (key: string) => `t:${key}`;
    return cmp;
  }

  it('labels known variant, truncated id, or product target', () => {
    const cmp = bare();
    expect(cmp.stockAdjustmentTargetLabel({ variant_id: 'var-12345678-aaaa' } as any)).toBe('Large');
    expect(cmp.stockAdjustmentTargetLabel({ variant_id: 'abcdef12-zzzz' } as any)).toBe(
      'Variant abcdef12',
    );
    expect(cmp.stockAdjustmentTargetLabel({} as any)).toBe(
      't:adminUi.products.form.stockLedgerTargetProduct',
    );
  });
});
