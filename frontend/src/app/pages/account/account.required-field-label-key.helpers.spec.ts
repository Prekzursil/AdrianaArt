import { AccountState } from './account.state';

/** Golden WU account-required-field-label-key — requiredFieldLabelKey. */
describe('AccountState requiredFieldLabelKey (golden WU)', () => {
  it('maps required profile fields to auth.* i18n keys', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.requiredFieldLabelKey('name' as any)).toBe('auth.displayName');
    expect(cmp.requiredFieldLabelKey('username' as any)).toBe('auth.username');
    expect(cmp.requiredFieldLabelKey('first_name' as any)).toBe('auth.firstName');
    expect(cmp.requiredFieldLabelKey('last_name' as any)).toBe('auth.lastName');
    expect(cmp.requiredFieldLabelKey('date_of_birth' as any)).toBe('auth.dateOfBirth');
    expect(cmp.requiredFieldLabelKey('phone' as any)).toBe('auth.phone');
  });
});
