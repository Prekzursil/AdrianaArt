import { DERIVED_COLOR_NAMES } from './theme-derive';

/** Golden WU derived-color-names-pin -- DERIVED_COLOR_NAMES. */
describe('DERIVED_COLOR_NAMES (golden WU)', () => {
  it('starts with --background-subtle and has fourteen names', () => {
    expect(DERIVED_COLOR_NAMES[0]).toBe('--background-subtle');
    expect(DERIVED_COLOR_NAMES.length).toBe(14);
  });
});
