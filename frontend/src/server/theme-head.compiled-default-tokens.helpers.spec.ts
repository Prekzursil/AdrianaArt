import { COMPILED_DEFAULT_TOKENS } from './theme-head';

/** Golden WU compiled-default-tokens -- COMPILED_DEFAULT_TOKENS. */
describe('COMPILED_DEFAULT_TOKENS (golden WU)', () => {
  it('is frozen with seed primary defaults', () => {
    expect(Object.isFrozen(COMPILED_DEFAULT_TOKENS)).toBe(true);
    expect(COMPILED_DEFAULT_TOKENS['--background']).toBe('255 255 255');
    expect(COMPILED_DEFAULT_TOKENS['--accent']).toBeTruthy();
    expect(() => {
      (COMPILED_DEFAULT_TOKENS as Record<string, string>)['--x'] = '1';
    }).toThrow();
  });
});
