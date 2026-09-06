import { readEnv } from './theme-source';

/** Golden WU read-env -- readEnv. */
describe('readEnv (golden WU)', () => {
  it('trims provided env map; blank/missing -> undefined', () => {
    expect(readEnv('A', { A: '  x  ' })).toBe('x');
    expect(readEnv('A', { A: '   ' })).toBeUndefined();
    expect(readEnv('missing', {})).toBeUndefined();
  });
});
