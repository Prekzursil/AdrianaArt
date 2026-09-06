import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-add-scope-product -- addScopeProduct. */
describe('AdminCouponsComponent addScopeProduct (golden WU)', () => {
  it('returns early when product id is empty', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      productCache: {},
      promotionForm: { included_product_ids: [], excluded_product_ids: [] },
    });
    cmp.addScopeProduct('include', { id: '' } as any);
    expect((cmp as any).promotionForm.included_product_ids.length).toBe(0);
  });
});
