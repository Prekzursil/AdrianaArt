import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-window-helpers. */
describe('AdminContentSchedulingComponent window helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminContentSchedulingComponent {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    Object.assign(cmp as any, {
      windowDays: () => 14,
      ...overrides,
    });
    return cmp;
  }

  it('calendarStartDate is local midnight today; calendarEndDate adds windowDays', () => {
    const cmp = bare({ windowDays: () => 7 });
    const start = cmp.calendarStartDate();
    const now = new Date();
    expect(start.getFullYear()).toBe(now.getFullYear());
    expect(start.getMonth()).toBe(now.getMonth());
    expect(start.getDate()).toBe(now.getDate());
    expect(start.getHours()).toBe(0);
    const end = cmp.calendarEndDate();
    expect(end.getTime() - start.getTime()).toBe(7 * 86_400_000);
  });

  it('kindBadgeClass maps blog/global/page; trackRow returns key', () => {
    const cmp = bare();
    expect(cmp.kindBadgeClass('blog' as any)).toContain('indigo');
    expect(cmp.kindBadgeClass('global' as any)).toContain('amber');
    expect(cmp.kindBadgeClass('page' as any)).toContain('slate');
    expect(cmp.trackRow(0, { key: 'page.about' } as any)).toBe('page.about');
  });
});
