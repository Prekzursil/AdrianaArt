import { resolveToken } from './token-registry';

/** Golden WU resolve-token -- resolveToken. */
describe('resolveToken (golden WU)', () => {
  it('resolves known editable tokens; rejects invalid names', () => {
    expect(resolveToken('--accent')).toBeTruthy();
    expect(resolveToken('--accent')?.fallback).toBeTruthy();
    expect(resolveToken('not-a-token')).toBeUndefined();
    expect(resolveToken('')).toBeUndefined();
  });
});
