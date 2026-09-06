import { computePasswordStrength } from './password-strength.component';

describe('computePasswordStrength (golden WU)', () => {
  it('classifies weak/moderate/strong with penalties', () => {
    expect(computePasswordStrength('')).toBe('weak');
    expect(computePasswordStrength('abc')).toBe('weak');
    expect(computePasswordStrength('aaaaaaa')).toBe('weak'); // <8 after trim? length 7 -> weak
    expect(computePasswordStrength('aaaaaaaa')).toBe('weak'); // repeated penalty
    expect(computePasswordStrength('Abcdef12')).toBe('moderate');
    expect(computePasswordStrength('Abcdef12!xyzZZ')).toBe('strong');
    expect(computePasswordStrength('12345678aA!')).toBe('moderate'); // sequential penalty
  });
});
