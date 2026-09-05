import { ShopComponent } from './shop.component';

/** Golden WU shop-canedit-bulk-pending — N=3 canEditCategories / canEditProducts / bulkHasPendingEdits. */
describe('ShopComponent canEdit/bulk-pending helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    (cmp as any).bulkStatus = '';
    (cmp as any).bulkCategoryId = '';
    (cmp as any).bulkFeatured = '';
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('canEditCategories mirrors storefrontAdminMode.enabled', () => {
    expect(createCmp().canEditCategories()).toBe(false);
    expect(
      createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditCategories(),
    ).toBe(true);
  });

  it('canEditProducts mirrors storefrontAdminMode.enabled', () => {
    expect(createCmp().canEditProducts()).toBe(false);
    expect(createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditProducts()).toBe(
      true,
    );
  });

  it('bulkHasPendingEdits is true when any bulk edit field is non-empty after trim', () => {
    expect(createCmp().bulkHasPendingEdits()).toBe(false);
    expect(createCmp({ bulkStatus: '  ' }).bulkHasPendingEdits()).toBe(false);
    expect(createCmp({ bulkStatus: 'active' }).bulkHasPendingEdits()).toBe(true);
    expect(createCmp({ bulkCategoryId: 'cat-1' }).bulkHasPendingEdits()).toBe(true);
    expect(createCmp({ bulkFeatured: 'true' }).bulkHasPendingEdits()).toBe(true);
  });
});
