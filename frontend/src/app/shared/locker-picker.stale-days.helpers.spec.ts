import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-stale-days -- staleDays. */
describe('LockerPickerComponent staleDays (golden WU)', () => {
  it('converts stale_age_seconds into whole days with a 30-day default', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    Object.assign(cmp as any, { mirrorSnapshot: null });
    expect(cmp.staleDays()).toBe(30);
    Object.assign(cmp as any, { mirrorSnapshot: { stale_age_seconds: 0 } });
    expect(cmp.staleDays()).toBe(30);
    Object.assign(cmp as any, { mirrorSnapshot: { stale_age_seconds: 90000 } });
    expect(cmp.staleDays()).toBe(1);
    Object.assign(cmp as any, { mirrorSnapshot: { stale_age_seconds: 172800 } });
    expect(cmp.staleDays()).toBe(2);
  });
});
