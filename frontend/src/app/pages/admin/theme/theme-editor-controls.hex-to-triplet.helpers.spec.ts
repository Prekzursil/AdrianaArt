import { hexToTriplet } from './theme-editor-controls';

/** Golden WU hex-to-triplet -- hexToTriplet. */
describe('hexToTriplet (golden WU)', () => {
  it('maps #rgb/#rrggbb to R G B wire; malformed -> 0 0 0', () => {
    expect(hexToTriplet('#4f46e5')).toBe('79 70 229');
    expect(hexToTriplet('#abc')).toBe('170 187 204');
    expect(hexToTriplet('nope')).toBe('0 0 0');
  });
});
