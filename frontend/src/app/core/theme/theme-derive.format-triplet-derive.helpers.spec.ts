import { formatTriplet } from './theme-derive';

/** Golden WU format-triplet-derive -- formatTriplet. */
describe('formatTriplet (golden WU)', () => {
  it('renders space-separated R G B wire', () => {
    expect(formatTriplet([255, 255, 255])).toBe('255 255 255');
    expect(formatTriplet([15, 23, 42])).toBe('15 23 42');
  });
});
