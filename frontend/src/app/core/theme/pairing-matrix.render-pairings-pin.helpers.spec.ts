import { RENDER_PAIRINGS } from './pairing-matrix';

/** Golden WU render-pairings-pin -- RENDER_PAIRINGS. */
describe('RENDER_PAIRINGS (golden WU)', () => {
  it('includes text-on-background as the first canvas gate', () => {
    expect(RENDER_PAIRINGS[0]?.id).toBe('text-on-background');
    expect(RENDER_PAIRINGS.length).toBeGreaterThan(3);
  });
});
