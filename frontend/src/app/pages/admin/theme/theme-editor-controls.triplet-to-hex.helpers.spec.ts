import { tripletToHex } from './theme-editor-controls';

/** Golden WU triplet-to-hex -- tripletToHex. */
describe('tripletToHex (golden WU)', () => {
  it('maps R G B wire strings to #rrggbb; malformed -> black', () => {
    expect(tripletToHex('79 70 229')).toBe('#4f46e5');
    expect(tripletToHex('0 0 0')).toBe('#000000');
    expect(tripletToHex('bad')).toBe('#000000');
    expect(tripletToHex('1 2')).toBe('#000000');
  });
});
