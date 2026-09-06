import { shouldReloadOnRetry } from './offline.helpers';

describe('offline shouldReloadOnRetry (golden WU)', () => {
  it('reloads only when explicitly online', () => {
    expect(shouldReloadOnRetry(true)).toBe(true);
    expect(shouldReloadOnRetry(false)).toBe(false);
    expect(shouldReloadOnRetry(null as any)).toBe(false);
  });
});
