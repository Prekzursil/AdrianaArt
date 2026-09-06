import { ProductComponent } from './product.component';

/** Golden WU product-ui-lang — uiLang. */
describe('ProductComponent uiLang (golden WU)', () => {
  it('maps translate.currentLang to ro/en', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).translate = { currentLang: 'ro' };
    expect(cmp.uiLang).toBe('ro');
    (cmp as any).translate = { currentLang: 'en' };
    expect(cmp.uiLang).toBe('en');
    (cmp as any).translate = { currentLang: 'de' };
    expect(cmp.uiLang).toBe('en');
  });
});
