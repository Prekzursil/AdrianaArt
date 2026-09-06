import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent editSavedAddressTitle (golden WU)', () => {
  it('picks billing vs shipping i18n key', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const instant = jasmine.createSpy('instant').and.callFake((k: string) => k);
    (cmp as any).translate = { instant };
    (cmp as any).editSavedAddressTarget = 'billing';
    expect(cmp.editSavedAddressTitle()).toBe('checkout.editBillingAddressTitle');
    (cmp as any).editSavedAddressTarget = 'shipping';
    expect(cmp.editSavedAddressTitle()).toBe('checkout.editShippingAddressTitle');
  });
});
