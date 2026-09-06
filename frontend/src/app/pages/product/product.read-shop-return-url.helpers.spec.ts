import { ProductComponent } from './product.component';

describe('ProductComponent readShopReturnUrl (golden WU)', () => {
  const keyPending = 'shop_return_pending';
  const keyUrl = 'shop_return_url';

  afterEach(() => {
    sessionStorage.removeItem(keyPending);
    sessionStorage.removeItem(keyUrl);
  });

  it('returns /shop urls only when pending flag is set', () => {
    const cmp = Object.create(ProductComponent.prototype) as any;
    expect(cmp.readShopReturnUrl()).toBeNull();
    sessionStorage.setItem(keyPending, '1');
    sessionStorage.setItem(keyUrl, 'https://evil.example/shop');
    expect(cmp.readShopReturnUrl()).toBeNull();
    sessionStorage.setItem(keyUrl, '/shop?tag=clay');
    expect(cmp.readShopReturnUrl()).toBe('/shop?tag=clay');
    sessionStorage.setItem(keyUrl, '  /account  ');
    expect(cmp.readShopReturnUrl()).toBeNull();
  });
});
