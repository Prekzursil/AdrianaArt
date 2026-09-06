import { PasswordStrengthComponent } from './password-strength.component';

/** Golden WU password-strength-value — strengthValue. */
describe('PasswordStrengthComponent strengthValue (golden WU)', () => {
  function bare(password: string): PasswordStrengthComponent {
    const cmp = Object.create(PasswordStrengthComponent.prototype) as PasswordStrengthComponent;
    Object.assign(cmp as any, { password });
    return cmp;
  }

  it('maps weak/moderate/strong onto 0/1/2', () => {
    expect(bare('abc').strengthValue()).toBe(0);
    expect(bare('Abcdef12').strengthValue()).toBeGreaterThanOrEqual(1);
    expect(bare('Abcdef12!@#XYZ99long').strengthValue()).toBe(2);
  });
});
