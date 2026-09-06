import { isColorLiteral } from './token-registry';

/** Golden WU is-color-literal -- isColorLiteral. */
describe('isColorLiteral (golden WU)', () => {
  it('accepts hex/rgb/hsl literals and rejects bare triplets', () => {
    expect(isColorLiteral('#fff')).toBe(true);
    expect(isColorLiteral('#112233')).toBe(true);
    expect(isColorLiteral('rgb(1, 2, 3)')).toBe(true);
    expect(isColorLiteral('hsl(120, 50%, 40%)')).toBe(true);
    expect(isColorLiteral('255 255 255')).toBe(false);
  });
});
