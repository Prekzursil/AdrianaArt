import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-kind-badge — kindBadgeClass. */
describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  it('maps blog/global and defaults unknown', () => {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    expect(cmp.kindBadgeClass('blog' as any)).toContain('indigo');
    expect(cmp.kindBadgeClass('global' as any)).toContain('amber');
    expect(cmp.kindBadgeClass('page' as any)).toContain('slate');
  });
});
