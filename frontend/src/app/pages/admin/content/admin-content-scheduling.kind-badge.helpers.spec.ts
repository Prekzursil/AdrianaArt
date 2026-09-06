import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-kind-badge-helpers. */
describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  function bare(): AdminContentSchedulingComponent {
    return Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
  }

  it('kindBadgeClass maps blog/global/default', () => {
    const cmp = bare();
    expect(cmp.kindBadgeClass('blog')).toContain('indigo');
    expect(cmp.kindBadgeClass('global')).toContain('amber');
    expect(cmp.kindBadgeClass('page' as any)).toContain('slate');
  });
});
