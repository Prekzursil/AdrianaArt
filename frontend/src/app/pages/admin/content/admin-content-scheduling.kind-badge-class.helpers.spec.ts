import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-kind-badge-class — kindBadgeClass. */
describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  it('returns kind-specific badge classes', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as any;
    expect(cmp.kindBadgeClass('blog')).toContain('indigo');
    expect(cmp.kindBadgeClass('global')).toContain('amber');
    expect(cmp.kindBadgeClass('other')).toContain('slate');
  });
});
