import { FONT_FAMILY_ALLOWLIST } from '../../../core/theme/token-registry';
import { FONT_OPTIONS } from './theme-editor-controls';

/** Golden WU font-options-pin -- FONT_OPTIONS. */
describe('FONT_OPTIONS (golden WU)', () => {
  it('mirrors FONT_FAMILY_ALLOWLIST length and values', () => {
    expect(FONT_OPTIONS.length).toBe(FONT_FAMILY_ALLOWLIST.length);
    expect(FONT_OPTIONS.map((o) => o.value)).toEqual([...FONT_FAMILY_ALLOWLIST]);
  });
});
