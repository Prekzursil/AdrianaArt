import { PRIMARY_DEFAULTS } from './theme-derive';
import { onColorPairingsAlwaysContrast } from './pairing-matrix';

/** Golden WU on-color-pairings-always-contrast -- onColorPairingsAlwaysContrast. */
describe('onColorPairingsAlwaysContrast (golden WU)', () => {
  it('holds for compiled defaults and white accent canvases', () => {
    expect(onColorPairingsAlwaysContrast()).toBe(true);
    expect(
      onColorPairingsAlwaysContrast({
        ...PRIMARY_DEFAULTS,
        '--background': '255 255 255',
        '--accent': '255 255 255',
      }),
    ).toBe(true);
  });
});
