import { FONT_OPTIONS } from './theme-editor-controls';

/** Golden WU font-options -- FONT_OPTIONS. */
describe('FONT_OPTIONS (golden WU)', () => {
  it('exposes labelled allowlisted font values', () => {
    expect(FONT_OPTIONS.length).toBeGreaterThan(0);
    expect(FONT_OPTIONS[0].value).toContain('Inter');
    expect(FONT_OPTIONS.every((o) => o.value && o.labelKey.startsWith('adminUi.'))).toBe(
      true,
    );
  });
});
