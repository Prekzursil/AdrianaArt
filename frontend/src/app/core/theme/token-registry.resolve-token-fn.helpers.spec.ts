import { resolveToken } from './token-registry';

/** Golden WU resolve-token-fn -- resolveToken. */
describe('resolveToken (golden WU)', () => {
  it('resolves --background and rejects invalid names', () => {
    expect(resolveToken('--background')?.kind).toBe('color-triplet');
    expect(resolveToken('background')).toBeUndefined();
  });
});
