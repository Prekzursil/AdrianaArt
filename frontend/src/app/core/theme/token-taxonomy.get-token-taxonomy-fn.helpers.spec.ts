import { getToken } from './token-taxonomy';

/** Golden WU get-token-taxonomy-fn -- getToken. */
describe('getToken (golden WU)', () => {
  it('resolves --background as color and rejects unknown names', () => {
    expect(getToken('--background')?.kind).toBe('color');
    expect(getToken('--not-a-token')).toBeUndefined();
  });
});
