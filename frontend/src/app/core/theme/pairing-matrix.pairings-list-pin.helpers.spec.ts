import { PAIRINGS } from './pairing-matrix';

/** Golden WU pairings-list-pin -- PAIRINGS. */
describe('PAIRINGS (golden WU)', () => {
  it('starts with text-on-background and includes accent-on-surface', () => {
    expect(PAIRINGS[0]?.id).toBe('text-on-background');
    expect(PAIRINGS.some((p) => p.id === 'accent-on-surface')).toBe(true);
    expect(PAIRINGS.length).toBe(7);
  });
});
