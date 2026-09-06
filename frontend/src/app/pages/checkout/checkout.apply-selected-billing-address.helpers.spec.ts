import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-apply-selected-billing-address -- applySelectedBillingAddress. */
describe('CheckoutComponent applySelectedBillingAddress (golden WU)', () => {
  it('returns early when selected id is empty', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      selectedBillingAddressId: '',
      savedAddresses: [{ id: 'b1' }],
      applySavedAddressToBilling: jasmine.createSpy('applySavedAddressToBilling'),
    });
    cmp.applySelectedBillingAddress();
    expect((cmp as any).applySavedAddressToBilling).not.toHaveBeenCalled();
  });
});
