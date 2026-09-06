import { PRIMARY_COLOR_NAMES, PRIMARY_DEFAULTS } from './theme-derive';

/** Golden WU primary-color-names-pin -- PRIMARY_COLOR_NAMES. */
describe('PRIMARY_COLOR_NAMES (golden WU)', () => {
  it('mirrors PRIMARY_DEFAULTS keys including --background', () => {
    expect(PRIMARY_COLOR_NAMES).toEqual(Object.keys(PRIMARY_DEFAULTS));
    expect(PRIMARY_COLOR_NAMES).toContain('--background');
    expect(PRIMARY_COLOR_NAMES.length).toBe(9);
  });
});
