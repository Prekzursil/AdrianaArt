import { isColorLiteral } from './token-registry';

/** Golden WU is-color-literal-fn -- isColorLiteral. */
describe('isColorLiteral (golden WU)', () => {
  it('accepts hex and rgb() and rejects bare triplets', () => {
    expect(isColorLiteral('#0f172a')).toBe(true);
    expect(isColorLiteral('rgb(15, 23, 42)')).toBe(true);
    expect(isColorLiteral('15 23 42')).toBe(false);
  });
});
