import { PRIMARY_DEFAULTS } from './theme-derive';
import { evaluateThemeContrast } from './pairing-matrix';

/** Golden WU evaluate-theme-contrast-fn -- evaluateThemeContrast. */
describe('evaluateThemeContrast (golden WU)', () => {
  it('returns no failures for the compiled primary defaults', () => {
    expect(evaluateThemeContrast(PRIMARY_DEFAULTS)).toEqual([]);
  });
});
