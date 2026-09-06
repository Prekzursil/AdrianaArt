import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-export-csv -- exportCsv. */
describe('AdminInventoryComponent exportCsv (golden WU)', () => {
  it('returns early when export already in flight', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      exporting: true,
      admin: { exportRestockListCsv: jasmine.createSpy('export') },
    });
    cmp.exportCsv();
    expect((cmp as any).admin.exportRestockListCsv).not.toHaveBeenCalled();
  });
});
