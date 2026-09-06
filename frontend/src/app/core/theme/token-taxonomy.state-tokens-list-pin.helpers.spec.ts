import { STATE_TOKENS } from './token-taxonomy';

/** Golden WU state-tokens-list-pin -- STATE_TOKENS. */
describe('STATE_TOKENS (golden WU)', () => {
  it('includes canvas and inverse state colours', () => {
    const names = STATE_TOKENS.map((t) => t.name);
    expect(names).toContain('--background');
    expect(names).toContain('--text-inverse');
    expect(STATE_TOKENS.length).toBe(23);
  });
});
