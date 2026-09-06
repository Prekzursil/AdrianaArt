import { AccountState } from './account.state';

/** Golden WU account-format-cooldown — formatCooldown. */
describe('AccountState formatCooldown (golden WU)', () => {
  it('formats compact d/h/m/s parts', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.formatCooldown(0)).toBe('');
    expect(cmp.formatCooldown(-5)).toBe('');
    expect(cmp.formatCooldown(45)).toBe('45s');
    expect(cmp.formatCooldown(125)).toBe('2m 5s');
    expect(cmp.formatCooldown(3661)).toBe('1h 1m');
    expect(cmp.formatCooldown(90_000)).toBe('1d 1h');
  });
});
