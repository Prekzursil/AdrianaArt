import { isNumericLength } from './token-registry';

/** Golden WU is-numeric-length -- isNumericLength. */
describe('isNumericLength (golden WU)', () => {
  it('accepts unit lengths and safe math expressions', () => {
    expect(isNumericLength('16px')).toBe(true);
    expect(isNumericLength('1.5rem')).toBe(true);
    expect(isNumericLength('clamp(1rem, 2vw, 3rem)')).toBe(true);
    expect(isNumericLength('auto')).toBe(false);
    expect(isNumericLength('url(x)')).toBe(false);
  });
});
