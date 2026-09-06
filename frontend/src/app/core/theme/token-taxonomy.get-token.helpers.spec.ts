import { getToken } from './token-taxonomy';

/** Golden WU get-token -- getToken. */
describe('getToken (golden WU)', () => {
  it('returns seed tokens by name and undefined for unknowns', () => {
    const bg = getToken('--background');
    expect(bg?.name).toBe('--background');
    expect(bg?.kind).toBe('color');
    expect(getToken('--not-a-real-token')).toBeUndefined();
  });
});
