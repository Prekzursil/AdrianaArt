import { tripletToHex } from './theme-editor-controls';

describe('tripletToHex (golden WU)', () => {
  it('converts RGB triplets to hex and degrades malformed input to black', () => {
    expect(tripletToHex('15 23 42')).toBe('#0f172a');
    expect(tripletToHex(' 255  0  128 ')).toBe('#ff0080');
    expect(tripletToHex('1 2')).toBe('#000000');
    expect(tripletToHex('a b c')).toBe('#000000');
    expect(tripletToHex('300 -10 16.4')).toBe('#ff0010');
  });
});
