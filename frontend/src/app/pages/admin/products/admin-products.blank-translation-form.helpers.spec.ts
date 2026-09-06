import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-blank-translation-form — blankTranslationForm. */
describe('AdminProductsComponent blankTranslationForm (golden WU)', () => {
  it('returns empty translation fields', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).blankTranslationForm as (
      this: AdminProductsComponent,
    ) => Record<string, string>;
    expect(fn.call(cmp)).toEqual({
      name: '',
      short_description: '',
      long_description: '',
      meta_title: '',
      meta_description: '',
    });
  });
});
