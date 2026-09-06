import { AccountState } from './account.state';

/** Golden WU tracking-url -- trackingUrl. */
describe('AccountState trackingUrl (golden WU)', () => {
  it('builds a 17track URL and blanks empty input', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.trackingUrl('')).toBe('');
    expect(cmp.trackingUrl('  ABC 123  ')).toContain('ABC%20123');
    expect(cmp.trackingUrl('Z')).toContain('t.17track.net');
  });
});
