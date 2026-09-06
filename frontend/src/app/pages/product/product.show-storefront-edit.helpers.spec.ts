import { ProductComponent } from './product.component';

describe('ProductComponent showStorefrontEdit (golden WU)', () => {
  function createCmp(opts: {
    adminMode?: boolean;
    isAdmin?: boolean;
    impersonating?: boolean;
    slug?: string | null;
  }) {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => opts.adminMode ?? true };
    (cmp as any).auth = {
      isAdmin: () => opts.isAdmin ?? true,
      isImpersonating: () => opts.impersonating ?? false,
    };
    (cmp as any).product = opts.slug === null ? null : { slug: opts.slug ?? 'mug' };
    return cmp;
  }

  it('requires admin mode, admin auth, no impersonation, and product slug', () => {
    expect(createCmp({}).showStorefrontEdit()).toBe(true);
    expect(createCmp({ adminMode: false }).showStorefrontEdit()).toBe(false);
    expect(createCmp({ isAdmin: false }).showStorefrontEdit()).toBe(false);
    expect(createCmp({ impersonating: true }).showStorefrontEdit()).toBe(false);
    expect(createCmp({ slug: null }).showStorefrontEdit()).toBe(false);
    expect(createCmp({ slug: '' }).showStorefrontEdit()).toBe(false);
  });
});
