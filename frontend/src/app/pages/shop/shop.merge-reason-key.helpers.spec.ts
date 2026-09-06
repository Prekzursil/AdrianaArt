import { ShopComponent } from './shop.component';

/** Golden WU shop-merge-reason-key — mergeReasonKey. */
describe('ShopComponent mergeReasonKey (golden WU)', () => {
  it('maps merge reasons to i18n keys', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const fn = (ShopComponent.prototype as any).mergeReasonKey as (
      this: ShopComponent,
      reason: string | null | undefined,
    ) => string;
    expect(fn.call(cmp, 'same_category')).toBe('adminUi.storefront.categories.mergeReasonSame');
    expect(fn.call(cmp, 'different_parent')).toBe('adminUi.storefront.categories.mergeReasonParent');
    expect(fn.call(cmp, 'source_has_children')).toBe(
      'adminUi.storefront.categories.mergeReasonChildren',
    );
    expect(fn.call(cmp, 'other')).toBe('adminUi.storefront.categories.mergeNotAllowed');
  });
});
