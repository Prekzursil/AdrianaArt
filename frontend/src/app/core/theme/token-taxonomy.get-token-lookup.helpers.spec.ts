import { getToken } from './token-taxonomy';

/** Golden WU get-token-lookup -- getToken. */
describe('getToken (golden WU)', () => {
  it('resolves --background and rejects unknown names', () => {
    const bg = getToken('--background');
    expect(bg).toBeTruthy();
    expect(bg!.kind).toBe('color');
    expect(bg!.compiledDefault).toBe('255 255 255');
    expect(getToken('--not-a-real-token')).toBeUndefined();
  });
});
