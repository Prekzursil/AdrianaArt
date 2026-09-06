import { SPACE_OPTIONS } from './theme-editor-controls';

/** Golden WU space-options-list -- SPACE_OPTIONS. */
describe('SPACE_OPTIONS (golden WU)', () => {
  it('ships nine rem spacing-step presets', () => {
    expect(SPACE_OPTIONS.length).toBe(9);
    expect(SPACE_OPTIONS[0].value).toBe('0.25rem');
    expect(SPACE_OPTIONS[SPACE_OPTIONS.length - 1].value).toBe('3rem');
  });
});
