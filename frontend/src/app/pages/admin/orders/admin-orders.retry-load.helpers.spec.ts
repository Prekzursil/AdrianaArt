import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-retry-load -- retryLoad. */
describe('AdminOrdersComponent retryLoad (golden WU)', () => {
  it('delegates to load', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, { load: jasmine.createSpy('load') });
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
