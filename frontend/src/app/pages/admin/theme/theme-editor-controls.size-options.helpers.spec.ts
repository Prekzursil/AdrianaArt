import { SIZE_OPTIONS } from './theme-editor-controls';

/** Golden WU size-options -- SIZE_OPTIONS. */
describe('SIZE_OPTIONS (golden WU)', () => {
  it('ships four clamp() type-scale presets', () => {
    expect(SIZE_OPTIONS.length).toBe(4);
    expect(SIZE_OPTIONS.every((o) => o.value.startsWith('clamp('))).toBe(true);
    expect(SIZE_OPTIONS.map((o) => o.labelKey)).toContain('adminUi.theme.sizes.default');
  });
});
