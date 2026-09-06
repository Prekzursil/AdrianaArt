import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-retry-validation -- retryValidation. */
describe('CheckoutComponent retryValidation (golden WU)', () => {
  it('clears error and queues an immediate cart sync', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const items = jasmine.createSpy('items').and.returnValue([{ id: '1' }]);
    Object.assign(cmp as any, {
      errorMessage: 'boom',
      items,
      queueCartSync: jasmine.createSpy('queueCartSync'),
    });
    cmp.retryValidation();
    expect((cmp as any).errorMessage).toBe('');
    expect((cmp as any).queueCartSync).toHaveBeenCalledWith([{ id: '1' }], {
      immediate: true,
    });
  });
});
