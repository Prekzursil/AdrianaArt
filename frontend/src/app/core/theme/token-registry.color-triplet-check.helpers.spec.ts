import { isColorTriplet } from './token-registry';

/** Golden WU color-triplet-check -- isColorTriplet. */
describe('isColorTriplet (golden WU)', () => {
  it('accepts frozen R G B wire and rejects hex', () => {
    expect(isColorTriplet('255 255 255')).toBe(true);
    expect(isColorTriplet('15 23 42')).toBe(true);
    expect(isColorTriplet('#ffffff')).toBe(false);
    expect(isColorTriplet('255,255,255')).toBe(false);
  });
});
