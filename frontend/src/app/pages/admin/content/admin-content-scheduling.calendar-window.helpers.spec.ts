import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU — calendarStartDate/calendarEndDate window. */
describe('AdminContentSchedulingComponent calendar window (golden WU)', () => {
  function bare(days: number): AdminContentSchedulingComponent {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    (cmp as any).windowDays = () => days;
    return cmp;
  }

  it('starts at local midnight today and ends days later', () => {
    const cmp = bare(90);
    const start = cmp.calendarStartDate();
    const end = cmp.calendarEndDate();
    const now = new Date();
    expect(start.getFullYear()).toBe(now.getFullYear());
    expect(start.getMonth()).toBe(now.getMonth());
    expect(start.getDate()).toBe(now.getDate());
    expect(start.getHours()).toBe(0);
    expect(end.getTime() - start.getTime()).toBe(90 * 86_400_000);
  });
});
