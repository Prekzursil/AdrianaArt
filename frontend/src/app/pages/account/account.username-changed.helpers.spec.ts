import { AccountState } from './account.state';

/** Golden WU account-username-changed — usernameChanged. */
describe('AccountState usernameChanged (golden WU)', () => {
  function bare(current: string | null, next: string): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      profile: () => (current == null ? null : { username: current }),
      profileUsername: next,
    });
    return cmp;
  }

  it('is true only when next is non-empty and differs from current', () => {
    expect(bare('ada', 'ada').usernameChanged()).toBe(false);
    expect(bare('ada', 'ada2').usernameChanged()).toBe(true);
    expect(bare('ada', '  ').usernameChanged()).toBe(false);
    expect(bare(null, 'ada').usernameChanged()).toBe(true);
  });
});
