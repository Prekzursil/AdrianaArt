import { ShopComponent } from './shop.component';

describe('ShopComponent canEditCategories (golden WU)', () => {
  function make(enabled: boolean) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => enabled };
    return cmp;
  }
  it('mirrors storefrontAdminMode.enabled', () => {
    expect(make(true).canEditCategories()).toBe(true);
    expect(make(false).canEditCategories()).toBe(false);
  });
});
