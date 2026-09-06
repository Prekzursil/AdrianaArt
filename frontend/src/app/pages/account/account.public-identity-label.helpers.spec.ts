import { AccountState } from './account.state';
import * as identity from '../../shared/user-identity';

/** Golden WU account-public-identity-label — publicIdentityLabel. */
describe('AccountState publicIdentityLabel (golden WU)', () => {
  it('formats the provided user or falls back to profile()', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    const profile = { username: 'from-profile' } as any;
    Object.assign(cmp as any, { profile: () => profile });
    const spy = spyOn(identity, 'formatIdentity').and.returnValue('LABEL');
    expect(cmp.publicIdentityLabel({ username: 'explicit' } as any)).toBe('LABEL');
    expect(spy).toHaveBeenCalledWith({ username: 'explicit' }, '');
    expect(cmp.publicIdentityLabel()).toBe('LABEL');
    expect(spy).toHaveBeenCalledWith(profile, '');
  });
});
