import { PasswordStrengthComponent } from './password-strength.component';

/** Golden WU password-strength-strength-value — strengthValue. */
describe('PasswordStrengthComponent strengthValue (golden WU)', () => {
  it('maps weak/moderate/strong to 0/1/2', () => {
    const cmp = Object.create(PasswordStrengthComponent.prototype) as PasswordStrengthComponent;
    Object.assign(cmp as any, { password: 'abc' });
    expect(cmp.strengthValue()).toBe(0);
    Object.assign(cmp as any, { password: 'Abcdef12' });
    expect(cmp.strengthValue()).toBe(1);
    Object.assign(cmp as any, { password: 'Abcdef12!xyzWXYZ' });
    expect(cmp.strengthValue()).toBe(2);
  });
});
