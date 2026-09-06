import { shouldReloadOnRetry } from './offline.helpers';

/** Golden WU should-reload-on-retry -- shouldReloadOnRetry. */
describe('shouldReloadOnRetry (golden WU)', () => {
  it('reloads only when explicitly online', () => {
    expect(shouldReloadOnRetry(true)).toBe(true);
    expect(shouldReloadOnRetry(false)).toBe(false);
  });
});
