import { parseTriplet } from './pairing-matrix';

/** Golden WU parse-triplet-matrix-fn -- parseTriplet. */
describe('parseTriplet (golden WU)', () => {
  it('parses R G B and throws on two-part input', () => {
    expect(parseTriplet('15 23 42')).toEqual([15, 23, 42]);
    expect(() => parseTriplet('15 23')).toThrow();
  });
});
