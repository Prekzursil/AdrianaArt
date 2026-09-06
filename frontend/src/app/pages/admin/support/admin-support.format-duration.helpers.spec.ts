import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-format-duration — formatDuration. */
describe('AdminSupportComponent formatDuration (golden WU)', () => {
  it('formats ms into d/h/m parts', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    const fn = (AdminSupportComponent.prototype as any).formatDuration as (
      this: AdminSupportComponent,
      ms: number,
    ) => string;
    expect(fn.call(cmp, -1000)).toBe('0m');
    expect(fn.call(cmp, 90_000)).toBe('1m');
    expect(fn.call(cmp, 3_600_000)).toBe('1h 0m');
    expect(fn.call(cmp, 90_000_000)).toBe('1d 1h 0m');
  });
});
