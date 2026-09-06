import { decodeCssEscapes } from './css-safe-encode';

/** Golden WU decode-css-escapes — decodeCssEscapes. */
describe('decodeCssEscapes (golden WU)', () => {
  it('decodes hex and literal escapes', () => {
    expect(decodeCssEscapes('\\41')).toBe('A');
    expect(decodeCssEscapes('\\.')).toBe('.');
    expect(decodeCssEscapes('plain')).toBe('plain');
  });
});
