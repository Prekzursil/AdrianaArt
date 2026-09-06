import { hexToTriplet } from './theme-editor-controls';

/** Golden WU hex-to-triplet-fn -- hexToTriplet. */
describe('hexToTriplet (golden WU)', () => {
  it('converts #rgb/#rrggbb to R G B wire and degrades bad input', () => {
    expect(hexToTriplet('#0f172a')).toBe('15 23 42');
    expect(hexToTriplet('#fff')).toBe('255 255 255');
    expect(hexToTriplet('not-a-hex')).toBe('0 0 0');
  });
});
