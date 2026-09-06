import { formatTriplet } from './theme-derive';

/** Golden WU theme-format-triplet — formatTriplet. */
describe('formatTriplet (golden WU)', () => {
  it('joins rgb channels with spaces', () => {
    expect(formatTriplet([12, 34, 56])).toBe('12 34 56');
  });
});
