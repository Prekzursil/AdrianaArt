import { ShopComponent } from './shop.component';

/** Golden WU shop-toggle-bulk-select-mode -- toggleBulkSelectMode. */
describe('ShopComponent toggleBulkSelectMode (golden WU)', () => {
  it('returns early when products cannot be edited', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      canEditProducts: jasmine.createSpy('canEdit').and.returnValue(false),
      bulkSelectMode: Object.assign(jasmine.createSpy('bulk').and.returnValue(false), {
        set: jasmine.createSpy('set'),
      }),
      resetBulkEdits: jasmine.createSpy('reset'),
      clearBulkSelection: jasmine.createSpy('clear'),
    });
    cmp.toggleBulkSelectMode();
    expect((cmp as any).bulkSelectMode.set).not.toHaveBeenCalled();
    expect((cmp as any).resetBulkEdits).not.toHaveBeenCalled();
  });
});
