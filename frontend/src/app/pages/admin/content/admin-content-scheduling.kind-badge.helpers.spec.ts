import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  it('returns kind-specific badge classes', () => {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    expect(cmp.kindBadgeClass('blog')).toContain('indigo');
    expect(cmp.kindBadgeClass('global')).toContain('amber');
    expect(cmp.kindBadgeClass('page')).toContain('slate');
  });
});
