import { AccountState } from './account.state';

/** Golden WU account-normalize-address-label — normalizeAddressLabel. */
describe('AccountState normalizeAddressLabel (golden WU)', () => {
  it('normalizes empty/home/work/other and translated keys', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    (cmp as any).t = (key: string) =>
      ({
        'account.addresses.labels.home': 'Acasa',
        'account.addresses.labels.work': 'Serviciu',
        'account.addresses.labels.other': 'Altele',
      })[key] || key;
    const fn = (AccountState.prototype as any).normalizeAddressLabel as (
      this: AccountState,
      label: string | null | undefined,
    ) => string;
    expect(fn.call(cmp, null)).toBe('home');
    expect(fn.call(cmp, '  ')).toBe('home');
    expect(fn.call(cmp, 'HOME')).toBe('home');
    expect(fn.call(cmp, 'work')).toBe('work');
    expect(fn.call(cmp, 'other')).toBe('other');
    expect(fn.call(cmp, 'Acasa')).toBe('home');
    expect(fn.call(cmp, 'Serviciu')).toBe('work');
    expect(fn.call(cmp, 'custom loft')).toBe('custom loft');
  });
});
