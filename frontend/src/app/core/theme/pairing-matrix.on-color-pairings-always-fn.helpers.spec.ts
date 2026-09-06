import { PRIMARY_DEFAULTS } from './theme-derive';
import { onColorPairingsAlwaysContrast } from './pairing-matrix';

/** Golden WU on-color-pairings-always-fn -- onColorPairingsAlwaysContrast. */
describe('onColorPairingsAlwaysContrast (golden WU)', () => {
  it('holds for compiled primary defaults', () => {
    expect(onColorPairingsAlwaysContrast(PRIMARY_DEFAULTS)).toBe(true);
    expect(onColorPairingsAlwaysContrast()).toBe(true);
  });
});
