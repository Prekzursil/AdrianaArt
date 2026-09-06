import { parseTriplet } from './theme-derive';

/** Golden WU parse-triplet -- parseTriplet. */
describe('parseTriplet (golden WU)', () => {
  it('parses a space-separated RGB wire string into a tuple', () => {
    expect(parseTriplet('255 255 255')).toEqual([255, 255, 255]);
    expect(parseTriplet('15 23 42')).toEqual([15, 23, 42]);
  });
});
