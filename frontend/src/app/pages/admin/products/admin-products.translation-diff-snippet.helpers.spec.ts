import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-translation-diff-snippet — translationDiffSnippet. */
describe('AdminProductsComponent translationDiffSnippet (golden WU)', () => {
  it('returns em dash, short text, or truncated snippet', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).translationDiffSnippet as (
      this: AdminProductsComponent,
      value: string,
    ) => string;
    expect(fn.call(cmp, '   ')).toBe('—');
    expect(fn.call(cmp, 'hello')).toBe('hello');
    const long = 'x'.repeat(90);
    expect(fn.call(cmp, long)).toBe(`${'x'.repeat(77)}…`);
  });
});
