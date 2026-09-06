import { PRIMARY_DEFAULTS } from './theme-derive';

/** Golden WU primary-defaults -- PRIMARY_DEFAULTS. */
describe('PRIMARY_DEFAULTS (golden WU)', () => {
  it('ships white canvas + indigo accent triplets', () => {
    expect(PRIMARY_DEFAULTS['--background']).toBe('255 255 255');
    expect(PRIMARY_DEFAULTS['--accent']).toBe('79 70 229');
    expect(PRIMARY_DEFAULTS['--surface-inverse']).toBe('15 23 42');
    expect(Object.keys(PRIMARY_DEFAULTS).every((k) => k.startsWith('--'))).toBe(true);
  });
});
