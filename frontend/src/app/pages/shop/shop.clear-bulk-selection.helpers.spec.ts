import { ShopComponent } from './shop.component';

/** Golden WU shop-clear-bulk-selection -- clearBulkSelection. */
describe('ShopComponent clearBulkSelection (golden WU)', () => {
  it('resets bulkSelectedProductIds to an empty Set', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      bulkSelectedProductIds: { set: jasmine.createSpy('set') },
    });
    cmp.clearBulkSelection();
    expect((cmp as any).bulkSelectedProductIds.set).toHaveBeenCalled();
    const arg = (cmp as any).bulkSelectedProductIds.set.calls.mostRecent().args[0];
    expect(arg instanceof Set).toBe(true);
    expect(arg.size).toBe(0);
  });
});
