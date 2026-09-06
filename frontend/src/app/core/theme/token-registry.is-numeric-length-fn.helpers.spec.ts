import { isNumericLength } from './token-registry';

/** Golden WU is-numeric-length-fn -- isNumericLength. */
describe('isNumericLength (golden WU)', () => {
  it('accepts rem lengths and rejects bare words', () => {
    expect(isNumericLength('1rem')).toBe(true);
    expect(isNumericLength('clamp(1rem, 2vw, 3rem)')).toBe(true);
    expect(isNumericLength('auto')).toBe(false);
  });
});
