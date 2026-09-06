import { DERIVATIONS } from './theme-derive';

/** Golden WU derivations-pin -- DERIVATIONS. */
describe('DERIVATIONS (golden WU)', () => {
  it('defines mix for --background-subtle and oncolor for --text-inverse', () => {
    expect(DERIVATIONS['--background-subtle']).toEqual({
      op: 'mix',
      a: '--background',
      b: '--surface',
      t: 0.5,
    });
    expect(DERIVATIONS['--text-inverse']?.op).toBe('oncolor');
    expect(Object.keys(DERIVATIONS).length).toBe(14);
  });
});
