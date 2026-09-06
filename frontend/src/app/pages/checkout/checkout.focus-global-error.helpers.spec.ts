import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-focus-global-error -- focusGlobalError. */
describe('CheckoutComponent focusGlobalError (golden WU)', () => {
  it('delegates to focusElementById for the global error anchor', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      focusElementById: jasmine.createSpy('focusElementById'),
    });
    (cmp as any).focusGlobalError();
    expect((cmp as any).focusElementById).toHaveBeenCalledWith('checkout-global-error');
  });
});
