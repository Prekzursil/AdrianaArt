import { STATE_TOKENS } from './token-taxonomy';

/** Golden WU state-tokens -- STATE_TOKENS. */
describe('STATE_TOKENS (golden WU)', () => {
  it('pairs light/dark compiled defaults for --background', () => {
    const bg = STATE_TOKENS.find((t) => t.name === '--background');
    expect(bg).toBeTruthy();
    expect(bg!.light).toBe('255 255 255');
    expect(bg!.dark).toBe('15 23 42');
    expect(STATE_TOKENS.length).toBeGreaterThanOrEqual(20);
  });
});
