import { shouldReloadOnRetry } from './error.helpers';

describe('error shouldReloadOnRetry (golden WU)', () => {
  it('requires a reload fn and rejects already-reloading', () => {
    const reload = () => undefined;
    expect(shouldReloadOnRetry(reload)).toBe(true);
    expect(shouldReloadOnRetry(reload, true)).toBe(false);
    expect(shouldReloadOnRetry(null)).toBe(false);
    expect(shouldReloadOnRetry(undefined)).toBe(false);
  });
});
