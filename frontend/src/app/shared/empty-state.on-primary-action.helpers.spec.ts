import { EmptyStateComponent } from './empty-state.component';

/** Golden WU empty-state-on-primary-action — onPrimaryAction. */
describe('EmptyStateComponent onPrimaryAction (golden WU)', () => {
  it('emits only when primaryActionUrl is unset', () => {
    const cmp = Object.create(EmptyStateComponent.prototype) as EmptyStateComponent;
    let emits = 0;
    Object.assign(cmp as any, {
      primaryActionUrl: null,
      primaryAction: { emit: () => { emits += 1; } },
    });
    cmp.onPrimaryAction();
    expect(emits).toBe(1);
    Object.assign(cmp as any, { primaryActionUrl: '/shop' });
    cmp.onPrimaryAction();
    expect(emits).toBe(1);
  });
});
