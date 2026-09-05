import { AccountState } from './account.state';

describe('AccountState format/comment helpers (golden WU)', () => {
  function createState(): AccountState {
    return Object.create(AccountState.prototype) as AccountState;
  }

  it('formatDurationShort formats hours, minutes, and seconds arms', () => {
    const state = createState();
    expect(state.formatDurationShort(0)).toBe('0s');
    expect(state.formatDurationShort(-500)).toBe('0s');
    expect(state.formatDurationShort(1_000)).toBe('1s');
    expect(state.formatDurationShort(65_000)).toBe('1m 5s');
    expect(state.formatDurationShort(3_661_000)).toBe('1h 1m');
  });

  it('commentStatusChipClass maps posted/hidden/deleted and default', () => {
    const state = createState();
    expect(state.commentStatusChipClass('posted')).toContain('emerald');
    expect(state.commentStatusChipClass('hidden')).toContain('amber');
    expect(state.commentStatusChipClass('deleted')).toContain('slate');
    expect(state.commentStatusChipClass('pending')).toContain('slate');
    expect(state.commentStatusChipClass('posted')).not.toEqual(
      state.commentStatusChipClass('hidden'),
    );
  });

  it('formatTimestamp returns empty for nullish and locale string for valid dates', () => {
    const state = createState();
    expect(state.formatTimestamp(null)).toBe('');
    expect(state.formatTimestamp(undefined)).toBe('');
    expect(state.formatTimestamp('')).toBe('');
    const iso = '2026-01-15T12:00:00.000Z';
    expect(state.formatTimestamp(iso)).toBe(new Date(iso).toLocaleString());
  });
});
