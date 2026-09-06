import { SPACE_OPTIONS } from './theme-editor-controls';

/** Golden WU space-options-pin -- SPACE_OPTIONS. */
describe('SPACE_OPTIONS (golden WU)', () => {
  it('pins nine rem steps from 0.25rem to 3rem', () => {
    expect(SPACE_OPTIONS.length).toBe(9);
    expect(SPACE_OPTIONS[0]?.value).toBe('0.25rem');
    expect(SPACE_OPTIONS.at(-1)?.value).toBe('3rem');
  });
});
