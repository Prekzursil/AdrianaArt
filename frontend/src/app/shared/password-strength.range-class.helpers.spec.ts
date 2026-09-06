import { PasswordStrengthComponent } from './password-strength.component';

/** Golden WU password-strength-range-class — rangeClass. */
describe('PasswordStrengthComponent rangeClass (golden WU)', () => {
  function bare(password: string): PasswordStrengthComponent {
    const cmp = Object.create(PasswordStrengthComponent.prototype) as PasswordStrengthComponent;
    Object.assign(cmp as any, { password });
    return cmp;
  }

  it('maps strength levels to range accents', () => {
    expect(bare('a').rangeClass()).toBe('accent-rose-500');
    expect(bare('Abcdef12').rangeClass()).toBe('accent-amber-500');
    expect(bare('Abcdef12!xyzZZ').rangeClass()).toBe('accent-emerald-500');
  });
});
