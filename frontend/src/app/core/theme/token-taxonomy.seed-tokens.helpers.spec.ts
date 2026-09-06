import { SEED_TOKENS } from './token-taxonomy';

/** Golden WU seed-tokens -- SEED_TOKENS. */
describe('SEED_TOKENS (golden WU)', () => {
  it('ships --background as a normal-tier color seed', () => {
    const bg = SEED_TOKENS.find((t) => t.name === '--background');
    expect(bg).toBeTruthy();
    expect(bg!.kind).toBe('color');
    expect(bg!.tier).toBe('normal');
    expect(bg!.compiledDefault).toBe('255 255 255');
    expect(SEED_TOKENS.length).toBeGreaterThan(10);
  });
});
