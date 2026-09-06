import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

describe('AdminContentSchedulingComponent calendar window (golden WU)', () => {
  it('calendarStartDate is today midnight; end is start + windowDays', () => {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    (cmp as any).windowDays = () => 7;
    const start = cmp.calendarStartDate();
    const end = cmp.calendarEndDate();
    const now = new Date();
    expect(start.getFullYear()).toBe(now.getFullYear());
    expect(start.getMonth()).toBe(now.getMonth());
    expect(start.getDate()).toBe(now.getDate());
    expect(start.getHours()).toBe(0);
    expect(end.getTime() - start.getTime()).toBe(7 * 86_400_000);
  });
});
