import { hexToTriplet } from './theme-editor-controls';

describe('hexToTriplet (golden WU)', () => {
  it('expands #rgb/#rrggbb and degrades malformed hex to zeros', () => {
    expect(hexToTriplet('#0f172a')).toBe('15 23 42');
    expect(hexToTriplet('ff0080')).toBe('255 0 128');
    expect(hexToTriplet('#abc')).toBe('170 187 204');
    expect(hexToTriplet('not-hex')).toBe('0 0 0');
    expect(hexToTriplet('#12')).toBe('0 0 0');
  });
});
