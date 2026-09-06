import { ProductComponent } from './product.component';

/** Golden WU product-back-to-shop — backToShop. */
describe('ProductComponent backToShop (golden WU)', () => {
  it('navigates to shopReturnUrl when set, else /shop', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    const navigated: string[] = [];
    (cmp as any).router = {
      navigateByUrl: (u: string) => {
        navigated.push(`byUrl:${u}`);
        return Promise.resolve(true);
      },
      navigate: (cmds: string[]) => {
        navigated.push(`nav:${cmds.join('/')}`);
        return Promise.resolve(true);
      },
    };
    (cmp as any).shopReturnUrl = '/shop?cat=shoes';
    cmp.backToShop();
    expect(navigated).toEqual(['byUrl:/shop?cat=shoes']);
    navigated.length = 0;
    (cmp as any).shopReturnUrl = null;
    cmp.backToShop();
    expect(navigated).toEqual(['nav:/shop']);
  });
});
