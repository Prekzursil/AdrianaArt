import { isColorTriplet } from './token-registry';

/** Golden WU token-is-color-triplet — isColorTriplet. */
describe('isColorTriplet (golden WU)', () => {
  it('accepts space-separated rgb channels', () => {
    expect(isColorTriplet('12 34 56')).toBe(true);
    expect(isColorTriplet('0 0 0')).toBe(true);
    expect(isColorTriplet('#112233')).toBe(false);
    expect(isColorTriplet('12,34,56')).toBe(false);
  });
});
