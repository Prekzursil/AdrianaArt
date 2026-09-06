import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-close-edit-saved-address -- closeEditSavedAddress. */
describe('CheckoutComponent closeEditSavedAddress (golden WU)', () => {
  it('clears edit-saved-address modal state', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      editSavedAddressOpen: true,
      editSavedAddressError: 'err',
      editSavedAddressId: 'a1',
      editSavedAddressModel: { id: 'a1' },
      editSavedAddressSaving: true,
    });
    cmp.closeEditSavedAddress();
    expect((cmp as any).editSavedAddressOpen).toBe(false);
    expect((cmp as any).editSavedAddressError).toBe('');
    expect((cmp as any).editSavedAddressId).toBe('');
    expect((cmp as any).editSavedAddressModel).toBeNull();
    expect((cmp as any).editSavedAddressSaving).toBe(false);
  });
});
