import { isColorTriplet } from './token-registry';

/** Golden WU is-color-triplet-fn -- isColorTriplet. */
describe('isColorTriplet (golden WU)', () => {
  it('accepts R G B triplets and rejects hex', () => {
    expect(isColorTriplet('15 23 42')).toBe(true);
    expect(isColorTriplet('#0f172a')).toBe(false);
  });
});
