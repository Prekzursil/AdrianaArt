import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-add-relationship -- addRelationship. */
describe('AdminProductsComponent addRelationship (golden WU)', () => {
  it('returns early when item id is empty', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      editingProductId: jasmine.createSpy('editing').and.returnValue('x'),
      relationshipsRelatedIds: jasmine.createSpy('rel').and.returnValue([]),
      relationshipsUpsellIds: jasmine.createSpy('up').and.returnValue([]),
      relationshipsRelatedIds_set: null,
    });
    (cmp as any).relationshipsRelatedIds.set = jasmine.createSpy('set');
    cmp.addRelationship({ id: '' } as any, 'related');
    expect((cmp as any).relationshipsRelatedIds.set).not.toHaveBeenCalled();
  });
});
