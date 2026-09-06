import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-retry-load -- retryLoad. */
describe('AdminInventoryComponent retryLoad (golden WU)', () => {
  it('delegates to load()', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, { load: jasmine.createSpy('load') });
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
