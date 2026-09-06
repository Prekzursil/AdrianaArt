import { AccountState } from './account.state';

/** Golden WU account-tracking-url — trackingUrl. */
describe('AccountState trackingUrl (golden WU)', () => {
  it('builds 17track URL or empty for blank tracking numbers', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.trackingUrl('')).toBe('');
    expect(cmp.trackingUrl('  ')).toBe('');
    expect(cmp.trackingUrl(' AB 12 ')).toBe('https://t.17track.net/en#nums=AB%2012');
  });
});
