import { SEED_TOKENS } from './token-taxonomy';

/** Golden WU seed-tokens-list -- SEED_TOKENS. */
describe('SEED_TOKENS (golden WU)', () => {
  it('includes --background with a color kind', () => {
    const bg = SEED_TOKENS.find((t) => t.name === '--background');
    expect(bg?.kind).toBe('color');
    expect(bg?.compiledDefault).toBe('255 255 255');
  });
});
