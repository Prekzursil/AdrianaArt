import { CheckoutComponent } from './checkout.component';

/** Golden WU chk-edit-addr — N=3 editSavedAddressTitle / openEditSavedAddress / closeEditSavedAddress. */
describe('CheckoutComponent edit-saved-address helpers (golden WU)', () => {
  function createCmp(): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = { instant: (key: string) => `tr:${key}` };
    (cmp as any).auth = { isAuthenticated: () => true };
    (cmp as any).savedAddresses = [
      {
        id: 'a1',
        label: 'Home',
        phone: '+400',
        line1: 'Str. 1',
        line2: null,
        city: 'Bucharest',
        region: 'B',
        postal_code: '010101',
        country: 'ro',
        is_default_shipping: true,
        is_default_billing: false,
      },
    ];
    (cmp as any).selectedShippingAddressId = 'a1';
    (cmp as any).selectedBillingAddressId = '';
    (cmp as any).editSavedAddressTarget = 'shipping';
    (cmp as any).editSavedAddressId = 'stale';
    (cmp as any).editSavedAddressModel = { keep: true };
    (cmp as any).editSavedAddressError = 'err';
    (cmp as any).editSavedAddressOpen = false;
    (cmp as any).editSavedAddressSaving = true;
    return cmp;
  }

  it('editSavedAddressTitle switches shipping/billing translate keys', () => {
    const cmp = createCmp();
    expect(cmp.editSavedAddressTitle()).toBe('tr:checkout.editShippingAddressTitle');
    (cmp as any).editSavedAddressTarget = 'billing';
    expect(cmp.editSavedAddressTitle()).toBe('tr:checkout.editBillingAddressTitle');
  });

  it('openEditSavedAddress guards auth/id/missing and hydrates the editor model', () => {
    const cmp = createCmp();

    (cmp as any).auth.isAuthenticated = () => false;
    cmp.openEditSavedAddress('shipping');
    expect((cmp as any).editSavedAddressOpen).toBe(false);
    expect((cmp as any).editSavedAddressId).toBe('stale');

    (cmp as any).auth.isAuthenticated = () => true;
    (cmp as any).selectedShippingAddressId = '  ';
    cmp.openEditSavedAddress('shipping');
    expect((cmp as any).editSavedAddressOpen).toBe(false);

    (cmp as any).selectedShippingAddressId = 'missing';
    cmp.openEditSavedAddress('shipping');
    expect((cmp as any).editSavedAddressOpen).toBe(false);

    (cmp as any).selectedShippingAddressId = 'a1';
    cmp.openEditSavedAddress('shipping');
    expect((cmp as any).editSavedAddressTarget).toBe('shipping');
    expect((cmp as any).editSavedAddressId).toBe('a1');
    expect((cmp as any).editSavedAddressOpen).toBe(true);
    expect((cmp as any).editSavedAddressError).toBe('');
    expect((cmp as any).editSavedAddressModel).toEqual(
      jasmine.objectContaining({
        label: 'Home',
        line1: 'Str. 1',
        city: 'Bucharest',
        postal_code: '010101',
        country: 'RO',
        is_default_shipping: true,
        is_default_billing: false,
      }),
    );

    (cmp as any).selectedBillingAddressId = 'a1';
    cmp.openEditSavedAddress('billing');
    expect((cmp as any).editSavedAddressTarget).toBe('billing');
  });

  it('closeEditSavedAddress clears editor state', () => {
    const cmp = createCmp();
    (cmp as any).editSavedAddressOpen = true;
    cmp.closeEditSavedAddress();
    expect((cmp as any).editSavedAddressOpen).toBe(false);
    expect((cmp as any).editSavedAddressError).toBe('');
    expect((cmp as any).editSavedAddressId).toBe('');
    expect((cmp as any).editSavedAddressModel).toBeNull();
    expect((cmp as any).editSavedAddressSaving).toBe(false);
  });
});
