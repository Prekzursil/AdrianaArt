import { isNumericLength } from './token-registry';

/** Golden WU numeric-length-check -- isNumericLength. */
describe('isNumericLength (golden WU)', () => {
  it('accepts rem/px and safe clamp expressions', () => {
    expect(isNumericLength('1rem')).toBe(true);
    expect(isNumericLength('16px')).toBe(true);
    expect(isNumericLength('clamp(14px, 1vw + 11px, 16px)')).toBe(true);
    expect(isNumericLength('auto')).toBe(false);
  });
});
