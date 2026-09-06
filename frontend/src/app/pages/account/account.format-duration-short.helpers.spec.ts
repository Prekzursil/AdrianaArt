import { AccountState } from './account.state';

/** Golden WU account-format-duration-short — formatDurationShort. */
describe('AccountState formatDurationShort (golden WU)', () => {
  function bare(): AccountState {
    return Object.create(AccountState.prototype) as AccountState;
  }

  it('formats seconds minutes and hours', () => {
    const state = bare();
    expect(state.formatDurationShort(0)).toBe('0s');
    expect(state.formatDurationShort(5_000)).toBe('5s');
    expect(state.formatDurationShort(65_000)).toBe('1m 5s');
    expect(state.formatDurationShort(3_665_000)).toBe('1h 1m');
    expect(state.formatDurationShort(-100)).toBe('0s');
  });
});
