import { parseTriplet } from './theme-derive';

/** Golden WU theme-parse-triplet — parseTriplet. */
describe('parseTriplet (golden WU)', () => {
  it('splits space-separated rgb channels', () => {
    expect(parseTriplet('12 34 56')).toEqual([12, 34, 56]);
  });
});
