import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — stockReasonLabel i18n key. */
describe('AdminProductsComponent stockReasonLabel (golden WU)', () => {
  function bare(): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).t = (key: string) => `t:${key}`;
    return cmp;
  }

  it('translates stock reason key', () => {
    expect(bare().stockReasonLabel('manual' as any)).toBe(
      't:adminUi.products.form.stockReason.manual',
    );
  });
});
