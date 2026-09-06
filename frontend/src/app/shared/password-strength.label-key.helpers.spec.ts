import { PasswordStrengthComponent } from './password-strength.component';

/** Golden WU password-strength-label-key — labelKey. */
describe('PasswordStrengthComponent labelKey (golden WU)', () => {
  function bare(password: string): PasswordStrengthComponent {
    const cmp = Object.create(PasswordStrengthComponent.prototype) as PasswordStrengthComponent;
    Object.assign(cmp as any, { password });
    return cmp;
  }

  it('maps strength levels to auth keys', () => {
    expect(bare('a').labelKey()).toBe('auth.strengthWeak');
    expect(bare('Abcdef12').labelKey()).toBe('auth.strengthModerate');
    expect(bare('Abcdef12!xyzZZ').labelKey()).toBe('auth.strengthStrong');
  });
});
