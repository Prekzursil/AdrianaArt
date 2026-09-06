import { isColorTriplet } from './token-registry';

/** Golden WU is-color-triplet -- isColorTriplet. */
describe('isColorTriplet (golden WU)', () => {
  it('accepts bare R G B triplets and rejects malformed values', () => {
    expect(isColorTriplet('255 255 255')).toBe(true);
    expect(isColorTriplet('0 128 255')).toBe(true);
    expect(isColorTriplet('256 0 0')).toBe(false);
    expect(isColorTriplet('#ffffff')).toBe(false);
  });
});
