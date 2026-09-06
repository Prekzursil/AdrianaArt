import { AccountState } from './account.state';

/** Golden WU account-security-label — securityLabel. */
describe('AccountState securityLabel (golden WU)', () => {
  function bare(opts: {
    profile: unknown;
    verified: boolean;
    google: string | null;
  }): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      profile: () => opts.profile,
      emailVerified: () => opts.verified,
      googleEmail: () => opts.google,
      t: (k: string) => k,
    });
    return cmp;
  }

  it('returns loading without profile and joins verified/google keys', () => {
    expect(bare({ profile: null, verified: false, google: null }).securityLabel()).toBe(
      'notifications.loading',
    );
    expect(
      bare({ profile: { id: 'u1' }, verified: true, google: 'a@b.c' }).securityLabel(),
    ).toBe(
      'account.overview.security.emailVerified · account.overview.security.googleLinked',
    );
    expect(
      bare({ profile: { id: 'u1' }, verified: false, google: null }).securityLabel(),
    ).toBe(
      'account.overview.security.emailUnverified · account.overview.security.googleUnlinked',
    );
  });
});
