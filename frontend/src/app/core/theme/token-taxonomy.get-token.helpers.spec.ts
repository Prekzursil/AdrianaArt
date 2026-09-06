import { getToken } from './token-taxonomy';

/** Golden WU taxonomy-get-token — getToken. */
describe('getToken (golden WU)', () => {
  it('resolves known seed tokens and misses unknowns', () => {
    expect(getToken('--background')?.name).toBe('--background');
    expect(getToken('--not-a-real-token')).toBeUndefined();
  });
});
