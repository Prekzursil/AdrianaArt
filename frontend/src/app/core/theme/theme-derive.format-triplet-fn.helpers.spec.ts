import { formatTriplet } from './theme-derive';

/** Golden WU format-triplet-fn -- formatTriplet. */
describe('formatTriplet (golden WU)', () => {
  it('joins channels with spaces', () => {
    expect(formatTriplet([15, 23, 42])).toBe('15 23 42');
    expect(formatTriplet([255, 255, 255])).toBe('255 255 255');
  });
});
