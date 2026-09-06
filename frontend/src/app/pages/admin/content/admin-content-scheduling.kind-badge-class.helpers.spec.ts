import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-kind-badge-class — kindBadgeClass. */
describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  it('maps scheduling kinds to badge utility classes', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    expect(cmp.kindBadgeClass('blog')).toContain('indigo');
    expect(cmp.kindBadgeClass('global')).toContain('amber');
    expect(cmp.kindBadgeClass('page' as any)).toContain('slate');
  });
});
