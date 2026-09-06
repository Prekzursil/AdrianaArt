import { isColorLiteral } from './token-registry';

/** Golden WU token-is-color-literal — isColorLiteral. */
describe('isColorLiteral (golden WU)', () => {
  it('accepts hex/rgb/hsl forms', () => {
    expect(isColorLiteral('#fff')).toBe(true);
    expect(isColorLiteral('#112233')).toBe(true);
    expect(isColorLiteral('rgb(1, 2, 3)')).toBe(true);
    expect(isColorLiteral('hsl(10, 20%, 30%)')).toBe(true);
    expect(isColorLiteral('nope')).toBe(false);
  });
});
