import { EmptyStateComponent } from './empty-state.component';

/** Golden WU empty-state-on-secondary-action — onSecondaryAction. */
describe('EmptyStateComponent onSecondaryAction (golden WU)', () => {
  it('emits only when secondaryActionUrl is unset', () => {
    const cmp = Object.create(EmptyStateComponent.prototype) as EmptyStateComponent;
    let emits = 0;
    Object.assign(cmp as any, {
      secondaryActionUrl: null,
      secondaryAction: { emit: () => { emits += 1; } },
    });
    cmp.onSecondaryAction();
    expect(emits).toBe(1);
    Object.assign(cmp as any, { secondaryActionUrl: '/help' });
    cmp.onSecondaryAction();
    expect(emits).toBe(1);
  });
});
