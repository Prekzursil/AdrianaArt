import { resolveToken } from './token-registry';

/** Golden WU resolve-token-entry -- resolveToken. */
describe('resolveToken (golden WU)', () => {
  it('resolves base tokens and rejects malformed names', () => {
    expect(resolveToken('--background')).toBeTruthy();
    expect(resolveToken('--font-body')).toBeTruthy();
    expect(resolveToken('background')).toBeUndefined();
    expect(resolveToken('--bad name')).toBeUndefined();
  });
});
