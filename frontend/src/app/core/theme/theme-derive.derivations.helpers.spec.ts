import { DERIVATIONS, DERIVED_COLOR_NAMES } from './theme-derive';

/** Golden WU derivations -- DERIVATIONS. */
describe('DERIVATIONS (golden WU)', () => {
  it('defines an op for every derived color name', () => {
    expect(Object.keys(DERIVATIONS).length).toBe(DERIVED_COLOR_NAMES.length);
    for (const name of DERIVED_COLOR_NAMES) {
      expect(DERIVATIONS[name]).toBeTruthy();
      expect(DERIVATIONS[name].op).toBeTruthy();
    }
    expect(DERIVATIONS['--background-subtle'].op).toBe('mix');
    expect(DERIVATIONS['--text-inverse'].op).toBe('oncolor');
  });
});
