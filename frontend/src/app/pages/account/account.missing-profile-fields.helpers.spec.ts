import { AccountState } from './account.state';

/** Golden WU account-missing-profile-fields — missingProfileFields. */
describe('AccountState missingProfileFields (golden WU)', () => {
  it('reports all fields for null and empty for a complete profile', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { profile: () => null });
    expect(cmp.missingProfileFields()).toEqual([
      'name',
      'username',
      'first_name',
      'last_name',
      'date_of_birth',
      'phone',
    ]);

    Object.assign(cmp as any, {
      profile: () => ({
        name: 'Ana',
        username: 'ana',
        first_name: 'Ana',
        last_name: 'Pop',
        date_of_birth: '2000-01-01',
        phone: '+40723204204',
      }),
    });
    expect(cmp.missingProfileFields()).toEqual([]);
  });
});
