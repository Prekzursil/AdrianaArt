import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-blank-image-meta — blankImageMetaForm. */
describe('AdminProductsComponent blankImageMetaForm (golden WU)', () => {
  it('returns empty alt/caption', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).blankImageMetaForm as (
      this: AdminProductsComponent,
    ) => { alt_text: string; caption: string };
    expect(fn.call(cmp)).toEqual({ alt_text: '', caption: '' });
  });
});
