import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-apply-bulk-stock-adjustment -- applyBulkStockAdjustment. */
describe('AdminInventoryComponent applyBulkStockAdjustment (golden WU)', () => {
  it('returns early when bulk adjust already busy', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      bulkAdjustBusy: jasmine.createSpy('busy').and.returnValue(true),
      bulkAdjustError: { set: jasmine.createSpy('err') },
      rows: jasmine.createSpy('rows'),
    });
    cmp.applyBulkStockAdjustment();
    expect((cmp as any).bulkAdjustError.set).not.toHaveBeenCalled();
    expect((cmp as any).rows).not.toHaveBeenCalled();
  });
});
