import { isNumericLength } from './token-registry';

/** Golden WU token-is-numeric-length — isNumericLength. */
describe('isNumericLength (golden WU)', () => {
  it('accepts simple lengths and rejects junk', () => {
    expect(isNumericLength('12px')).toBe(true);
    expect(isNumericLength('1.5rem')).toBe(true);
    expect(isNumericLength('nope')).toBe(false);
  });
});
