import { PAIRINGS } from './pairing-matrix';

/** Golden WU pairings -- PAIRINGS. */
describe('PAIRINGS (golden WU)', () => {
  it('includes text-on-background body pairing', () => {
    const p = PAIRINGS.find((x) => x.id === 'text-on-background');
    expect(p).toBeTruthy();
    expect(p!.foreground).toBe('--text');
    expect(p!.background).toBe('--background');
    expect(p!.size).toBe('body');
    expect(PAIRINGS.length).toBeGreaterThanOrEqual(6);
  });
});
