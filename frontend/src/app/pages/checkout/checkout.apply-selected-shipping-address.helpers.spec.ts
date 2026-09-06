import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-apply-selected-shipping-address -- applySelectedShippingAddress. */
describe('CheckoutComponent applySelectedShippingAddress (golden WU)', () => {
  it('returns early when selected id is empty', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      selectedShippingAddressId: '  ',
      savedAddresses: [{ id: 'a1' }],
      applySavedAddressToShipping: jasmine.createSpy('applySavedAddressToShipping'),
    });
    cmp.applySelectedShippingAddress();
    expect((cmp as any).applySavedAddressToShipping).not.toHaveBeenCalled();
  });
});
