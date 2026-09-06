import { AccountState } from './account.state';

/** Golden WU account-default-address-label — defaultAddressLabel. */
describe('AccountState defaultAddressLabel (golden WU)', () => {
  function bare(opts: Record<string, unknown>): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      t: (k: string) => k,
      addressesLoading: () => false,
      addressesLoaded: () => true,
      defaultShippingAddress: () => null,
      ...opts,
    });
    return cmp;
  }

  it('shows loading, placeholder, empty, and labeled address states', () => {
    expect(bare({
      addressesLoading: () => true,
      addressesLoaded: () => false,
    }).defaultAddressLabel()).toBe('notifications.loading');
    expect(bare({ addressesLoaded: () => false }).defaultAddressLabel()).toBe('...');
    expect(bare({}).defaultAddressLabel()).toBe('account.overview.noAddresses');
    expect(bare({
      defaultShippingAddress: () => ({ label: 'Home' }),
    }).defaultAddressLabel()).toBe('Home');
    expect(bare({
      defaultShippingAddress: () => ({ label: '' }),
    }).defaultAddressLabel()).toBe('account.addresses.defaultShipping');
  });
});
