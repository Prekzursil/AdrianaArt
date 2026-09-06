import { STATE_TOKENS } from './token-taxonomy';

/** Golden WU state-tokens-check -- STATE_TOKENS. */
describe('STATE_TOKENS (golden WU)', () => {
  it('includes --background with light white and dark slate', () => {
    const bg = STATE_TOKENS.find((t) => t.name === '--background');
    expect(bg?.light).toBe('255 255 255');
    expect(bg?.dark).toBe('15 23 42');
  });
});
