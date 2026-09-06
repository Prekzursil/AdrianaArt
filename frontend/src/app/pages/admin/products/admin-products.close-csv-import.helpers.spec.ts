import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-close-csv-import -- closeCsvImport. */
describe('AdminProductsComponent closeCsvImport (golden WU)', () => {
  it('sets csvImportOpen false', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      csvImportOpen: { set: jasmine.createSpy('set') },
    });
    cmp.closeCsvImport();
    expect((cmp as any).csvImportOpen.set).toHaveBeenCalledWith(false);
  });
});
