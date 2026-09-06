import { PRIMARY_DEFAULTS } from './theme-derive';

/** Golden WU primary-defaults-map -- PRIMARY_DEFAULTS. */
describe('PRIMARY_DEFAULTS (golden WU)', () => {
  it('pins nine primaries including white background', () => {
    expect(Object.keys(PRIMARY_DEFAULTS).length).toBe(9);
    expect(PRIMARY_DEFAULTS['--background']).toBe('255 255 255');
    expect(PRIMARY_DEFAULTS['--accent']).toBe('79 70 229');
  });
});
