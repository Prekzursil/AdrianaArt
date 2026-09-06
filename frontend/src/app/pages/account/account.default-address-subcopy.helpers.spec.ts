import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-default-address-subcopy — defaultAddressSubcopy. */
describe('AccountState defaultAddressSubcopy (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      addressesLoading: signal(false),
      addressesLoaded: signal(true),
      defaultShippingAddress: () => null,
      t: (key: string) => key,
      ...overrides,
    });
    return state;
  }

  it('shows loading / empty / fallback / line1+city', () => {
    expect(
      bare({ addressesLoading: signal(true), addressesLoaded: signal(false) }).defaultAddressSubcopy(),
    ).toBe('notifications.loading');
    expect(bare({ addressesLoaded: signal(false) }).defaultAddressSubcopy()).toBe('');
    expect(bare().defaultAddressSubcopy()).toBe('account.overview.noAddressesCopy');
    expect(
      bare({
        defaultShippingAddress: () => ({ line1: 'Str. 1', city: 'Cluj' }),
      }).defaultAddressSubcopy(),
    ).toBe('Str. 1, Cluj');
    expect(
      bare({ defaultShippingAddress: () => ({ line1: '', city: '' }) }).defaultAddressSubcopy(),
    ).toBe('account.overview.savedAddressFallback');
  });
});
