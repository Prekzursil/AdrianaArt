import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-csv-import-can-apply — csvImportCanApply. */
describe('AdminProductsComponent csvImportCanApply (golden WU)', () => {
  it('requires file + result with zero errors', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).csvImportFile = () => null;
    (cmp as any).csvImportResult = () => null;
    expect(cmp.csvImportCanApply()).toBe(false);
    (cmp as any).csvImportFile = () => ({ name: 'a.csv' });
    (cmp as any).csvImportResult = () => ({ errors: ['x'] });
    expect(cmp.csvImportCanApply()).toBe(false);
    (cmp as any).csvImportResult = () => ({ errors: [] });
    expect(cmp.csvImportCanApply()).toBe(true);
    (cmp as any).csvImportResult = () => ({});
    expect(cmp.csvImportCanApply()).toBe(true);
  });
});
