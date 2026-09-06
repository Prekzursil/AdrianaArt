import { tripletToHex } from './theme-editor-controls';

/** Golden WU triplet-to-hex-fn -- tripletToHex. */
describe('tripletToHex (golden WU)', () => {
  it('converts R G B wire to #rrggbb and degrades bad input', () => {
    expect(tripletToHex('15 23 42')).toBe('#0f172a');
    expect(tripletToHex('255 255 255')).toBe('#ffffff');
    expect(tripletToHex('nope')).toBe('#000000');
  });
});
