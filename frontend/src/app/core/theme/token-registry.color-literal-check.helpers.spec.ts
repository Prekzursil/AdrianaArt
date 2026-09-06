import { isColorLiteral } from './token-registry';

/** Golden WU color-literal-check -- isColorLiteral. */
describe('isColorLiteral (golden WU)', () => {
  it('accepts hex/rgb/hsl literals and rejects triplets', () => {
    expect(isColorLiteral('#0f172a')).toBe(true);
    expect(isColorLiteral('rgb(15, 23, 42)')).toBe(true);
    expect(isColorLiteral('hsl(222 47% 11%)')).toBe(true);
    expect(isColorLiteral('15 23 42')).toBe(false);
  });
});
