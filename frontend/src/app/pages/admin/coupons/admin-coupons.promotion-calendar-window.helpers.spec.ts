import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-promotion-calendar-window — calendar start/end window. */
describe('AdminCouponsComponent promotion calendar window (golden WU)', () => {
  it('start is local midnight today; end is start + promotionCalendarDays', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).promotionCalendarDays = 14;
    const start = cmp.promotionCalendarStartDate();
    const end = cmp.promotionCalendarEndDate();
    const now = new Date();
    expect(start.getFullYear()).toBe(now.getFullYear());
    expect(start.getMonth()).toBe(now.getMonth());
    expect(start.getDate()).toBe(now.getDate());
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(end.getTime() - start.getTime()).toBe(14 * 86_400_000);
  });
});
