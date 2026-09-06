import { SIZE_OPTIONS } from './theme-editor-controls';

/** Golden WU size-options-pin -- SIZE_OPTIONS. */
describe('SIZE_OPTIONS (golden WU)', () => {
  it('pins four type-scale presets including default', () => {
    expect(SIZE_OPTIONS.length).toBe(4);
    expect(SIZE_OPTIONS.map((o) => o.labelKey)).toContain(
      'adminUi.theme.sizes.default',
    );
  });
});
