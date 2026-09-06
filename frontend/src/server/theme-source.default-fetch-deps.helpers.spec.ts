import { defaultFetchDeps } from './theme-source';

/** Golden WU default-fetch-deps -- defaultFetchDeps. */
describe('defaultFetchDeps (golden WU)', () => {
  it('exposes fetchImpl and monotonic now()', () => {
    const deps = defaultFetchDeps();
    expect(typeof deps.fetchImpl).toBe('function');
    expect(typeof deps.now).toBe('function');
    const a = deps.now();
    const b = deps.now();
    expect(b).toBeGreaterThanOrEqual(a);
  });
});
