import { PasswordStrengthComponent } from './password-strength.component';

/** Golden WU password-strength-label-class — labelClass. */
describe('PasswordStrengthComponent labelClass (golden WU)', () => {
  function bare(password: string): PasswordStrengthComponent {
    const cmp = Object.create(PasswordStrengthComponent.prototype) as PasswordStrengthComponent;
    Object.assign(cmp as any, { password });
    return cmp;
  }

  it('maps strength levels to label colors', () => {
    expect(bare('a').labelClass()).toContain('rose');
    expect(bare('Abcdef12').labelClass()).toContain('amber');
    expect(bare('Abcdef12!xyzZZ').labelClass()).toContain('emerald');
  });
});
