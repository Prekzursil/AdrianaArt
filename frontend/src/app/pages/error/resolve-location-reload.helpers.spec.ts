import { resolveLocationReload } from './error.helpers';

describe('resolveLocationReload (golden WU)', () => {
  it('returns a bound reload callback or null', () => {
    let hits = 0;
    const host = { reload: () => { hits += 1; } };
    const fn = resolveLocationReload(host);
    expect(typeof fn).toBe('function');
    fn!();
    expect(hits).toBe(1);
    expect(resolveLocationReload(null)).toBeNull();
    expect(resolveLocationReload({} as any)).toBeNull();
  });
});
