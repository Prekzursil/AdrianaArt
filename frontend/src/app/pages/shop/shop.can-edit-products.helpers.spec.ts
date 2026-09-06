import { ShopComponent } from './shop.component';

describe('ShopComponent canEditProducts (golden WU)', () => {
  function make(enabled: boolean) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => enabled };
    return cmp;
  }
  it('mirrors storefrontAdminMode.enabled', () => {
    expect(make(true).canEditProducts()).toBe(true);
    expect(make(false).canEditProducts()).toBe(false);
  });
});
