import { parseTriplet } from './pairing-matrix';

/** Golden WU parse-triplet-matrix -- parseTriplet. */
describe('parseTriplet (golden WU)', () => {
  it('parses frozen R G B wire and rejects short values', () => {
    expect(parseTriplet('15 23 42')).toEqual([15, 23, 42]);
    expect(() => parseTriplet('15 23')).toThrow();
  });
});
