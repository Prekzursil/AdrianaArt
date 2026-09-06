import { PRIMARY_COLOR_NAMES, PRIMARY_DEFAULTS } from './theme-derive';

/** Golden WU primary-color-names -- PRIMARY_COLOR_NAMES. */
describe('PRIMARY_COLOR_NAMES (golden WU)', () => {
  it('mirrors PRIMARY_DEFAULTS keys (nine primaries)', () => {
    expect(PRIMARY_COLOR_NAMES).toEqual(Object.keys(PRIMARY_DEFAULTS));
    expect(PRIMARY_COLOR_NAMES.length).toBe(9);
    expect(PRIMARY_COLOR_NAMES).toContain('--accent');
  });
});
