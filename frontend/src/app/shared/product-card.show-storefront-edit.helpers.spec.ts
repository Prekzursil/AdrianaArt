import { ProductCardComponent } from './product-card.component';

/** Golden WU product-card-show-storefront-edit — showStorefrontEdit. */
describe('ProductCardComponent showStorefrontEdit (golden WU)', () => {
  it('requires admin mode, admin auth, no impersonation, and slug', () => {
    const cmp = Object.create(ProductCardComponent.prototype) as ProductCardComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => false },
      auth: { isAdmin: () => true, isImpersonating: () => false },
      product: { slug: 'x' },
    });
    expect(cmp.showStorefrontEdit()).toBe(false);
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => true },
      auth: { isAdmin: () => false, isImpersonating: () => false },
    });
    expect(cmp.showStorefrontEdit()).toBe(false);
    Object.assign(cmp as any, {
      auth: { isAdmin: () => true, isImpersonating: () => true },
    });
    expect(cmp.showStorefrontEdit()).toBe(false);
    Object.assign(cmp as any, {
      auth: { isAdmin: () => true, isImpersonating: () => false },
      product: { slug: '' },
    });
    expect(cmp.showStorefrontEdit()).toBe(false);
    Object.assign(cmp as any, { product: { slug: 'mug' } });
    expect(cmp.showStorefrontEdit()).toBe(true);
  });
});
