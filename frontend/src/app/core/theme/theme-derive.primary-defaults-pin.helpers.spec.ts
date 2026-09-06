import { PRIMARY_DEFAULTS } from './theme-derive';

/** Golden WU primary-defaults-pin -- PRIMARY_DEFAULTS. */
describe('PRIMARY_DEFAULTS (golden WU)', () => {
  it('pins white background and indigo accent', () => {
    expect(PRIMARY_DEFAULTS['--background']).toBe('255 255 255');
    expect(PRIMARY_DEFAULTS['--accent']).toBe('79 70 229');
    expect(Object.keys(PRIMARY_DEFAULTS).length).toBe(9);
  });
});
