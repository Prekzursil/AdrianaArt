import { FONT_OPTIONS } from './theme-editor-controls';

/** Golden WU font-options-list -- FONT_OPTIONS. */
describe('FONT_OPTIONS (golden WU)', () => {
  it('mirrors five curated font-family presets', () => {
    expect(FONT_OPTIONS.length).toBe(5);
    expect(FONT_OPTIONS[0].value).toContain('Inter');
    expect(FONT_OPTIONS.every((o) => o.labelKey.startsWith('adminUi.theme.fonts.'))).toBe(
      true,
    );
  });
});
