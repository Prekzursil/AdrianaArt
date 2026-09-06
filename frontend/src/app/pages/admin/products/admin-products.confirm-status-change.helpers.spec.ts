import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-confirm-status-change -- confirmStatusChange. */
describe('AdminProductsComponent confirmStatusChange (golden WU)', () => {
  it('returns early when status confirm target is missing', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      statusConfirmTarget: jasmine.createSpy('target').and.returnValue(null),
      statusConfirmBusy: jasmine.createSpy('busy').and.returnValue(false),
      save: jasmine.createSpy('save'),
    });
    (cmp as any).statusConfirmBusy.set = jasmine.createSpy('set');
    cmp.confirmStatusChange();
    expect((cmp as any).save).not.toHaveBeenCalled();
  });
});
