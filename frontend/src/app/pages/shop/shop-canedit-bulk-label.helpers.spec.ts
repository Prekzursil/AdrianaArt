import { ShopComponent } from './shop.component';

describe('ShopComponent canEdit + bulkHasPendingEdits (golden WU #756 sidecar)', () => {
  function make(enabled: boolean, overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(ShopComponent.prototype);
    Object.assign(
      proto,
      {
        storefrontAdminMode: { enabled: () => enabled },
        bulkStatus: '',
        bulkCategoryId: '',
        bulkFeatured: '',
      },
      overrides,
    );
    return proto;
  }

  it('canEditCategories mirrors storefrontAdminMode.enabled', () => {
    expect(make(true).canEditCategories()).toBe(true);
    expect(make(false).canEditCategories()).toBe(false);
  });

  it('canEditProducts mirrors storefrontAdminMode.enabled', () => {
    expect(make(true).canEditProducts()).toBe(true);
    expect(make(false).canEditProducts()).toBe(false);
  });

  it('bulkHasPendingEdits is true when any bulk edit field is non-empty after trim', () => {
    expect(make(true).bulkHasPendingEdits()).toBe(false);
    expect(make(true, { bulkStatus: '  ' }).bulkHasPendingEdits()).toBe(false);
    expect(make(true, { bulkStatus: 'draft' }).bulkHasPendingEdits()).toBe(true);
    expect(make(true, { bulkCategoryId: ' c1 ' }).bulkHasPendingEdits()).toBe(true);
    expect(make(true, { bulkFeatured: 'true' }).bulkHasPendingEdits()).toBe(true);
  });
});
