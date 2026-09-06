import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-retry-load -- retryLoad. */
describe('AdminProductsComponent retryLoad (golden WU)', () => {
  it('delegates to load()', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { load: jasmine.createSpy('load') });
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
