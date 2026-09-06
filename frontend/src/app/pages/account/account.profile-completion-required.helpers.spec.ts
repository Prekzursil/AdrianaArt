import { AccountState } from './account.state';

/** Golden WU account-profile-completion-required — profileCompletionRequired. */
describe('AccountState profileCompletionRequired (golden WU)', () => {
  const complete = {
    name: 'Ana',
    username: 'ana',
    first_name: 'Ana',
    last_name: 'Pop',
    date_of_birth: '2000-01-01',
    phone: '+40723204204',
    google_sub: null as string | null,
  };

  it('is false without a profile or when nothing is missing', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { profile: () => null, forceProfileCompletion: false });
    expect(cmp.profileCompletionRequired()).toBe(false);

    Object.assign(cmp as any, { profile: () => ({ ...complete }), forceProfileCompletion: false });
    expect(cmp.profileCompletionRequired()).toBe(false);
  });

  it('requires completion when forced or google-linked with missing fields', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      profile: () => ({ ...complete, phone: '' }),
      forceProfileCompletion: true,
    });
    expect(cmp.profileCompletionRequired()).toBe(true);

    Object.assign(cmp as any, {
      profile: () => ({ ...complete, phone: '', google_sub: 'g' }),
      forceProfileCompletion: false,
    });
    expect(cmp.profileCompletionRequired()).toBe(true);
  });
});
