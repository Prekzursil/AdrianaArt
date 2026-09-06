import { AccountState } from './account.state';

/** Golden WU account-other-sessions-count — otherSessionsCount. */
describe('AccountState otherSessionsCount (golden WU)', () => {
  it('counts non-current sessions', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      sessions: () => [
        { is_current: true },
        { is_current: false },
        { is_current: false },
      ],
    });
    expect(cmp.otherSessionsCount()).toBe(2);
    Object.assign(cmp as any, { sessions: () => null });
    expect(cmp.otherSessionsCount()).toBe(0);
  });
});
