import { ShopComponent } from './shop.component';

describe('ShopComponent bulkHasPendingEdits (golden WU)', () => {
  function make(partial: Record<string, unknown>) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      bulkStatus: '',
      bulkCategoryId: '',
      bulkFeatured: '',
      ...partial,
    });
    return cmp;
  }
  it('is true when any bulk field is non-blank', () => {
    expect(make({}).bulkHasPendingEdits()).toBe(false);
    expect(make({ bulkStatus: '  ' }).bulkHasPendingEdits()).toBe(false);
    expect(make({ bulkStatus: 'draft' }).bulkHasPendingEdits()).toBe(true);
    expect(make({ bulkCategoryId: 'c1' }).bulkHasPendingEdits()).toBe(true);
    expect(make({ bulkFeatured: true }).bulkHasPendingEdits()).toBe(true);
  });
});
