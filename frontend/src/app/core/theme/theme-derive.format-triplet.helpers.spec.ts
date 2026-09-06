import { formatTriplet } from './theme-derive';

/** Golden WU format-triplet -- formatTriplet. */
describe('formatTriplet (golden WU)', () => {
  it('renders an RGB tuple as a space-separated wire string', () => {
    expect(formatTriplet([79, 70, 229])).toBe('79 70 229');
    expect(formatTriplet([0, 0, 0])).toBe('0 0 0');
  });
});
