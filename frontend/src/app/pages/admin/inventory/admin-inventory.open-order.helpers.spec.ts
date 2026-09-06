import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-open-order -- openOrder. */
describe('AdminInventoryComponent openOrder (golden WU)', () => {
  it('navigates to /admin/orders/:id', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      router: { navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)) },
    });
    cmp.openOrder('ord-9');
    expect((cmp as any).router.navigate).toHaveBeenCalledWith(['/admin/orders', 'ord-9']);
  });
});
