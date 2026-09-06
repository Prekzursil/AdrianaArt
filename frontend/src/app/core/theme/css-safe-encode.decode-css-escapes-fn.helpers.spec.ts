import { decodeCssEscapes } from './css-safe-encode';

/** Golden WU decode-css-escapes-fn -- decodeCssEscapes. */
describe('decodeCssEscapes (golden WU)', () => {
  it('decodes hex escapes and leaves plain triplets unchanged', () => {
    expect(decodeCssEscapes('\\3c')).toBe('<');
    expect(decodeCssEscapes('15 23 42')).toBe('15 23 42');
  });
});
