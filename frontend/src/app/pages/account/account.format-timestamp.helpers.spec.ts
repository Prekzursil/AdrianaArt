import { AccountState } from './account.state';

/** Golden WU account-format-timestamp — formatTimestamp. */
describe('AccountState formatTimestamp (golden WU)', () => {
  it('returns empty for nullish and locale-formats valid timestamps', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.formatTimestamp(null)).toBe('');
    expect(cmp.formatTimestamp(undefined)).toBe('');
    const iso = '2024-01-15T12:00:00.000Z';
    expect(cmp.formatTimestamp(iso)).toBe(new Date(iso).toLocaleString());
  });
});
