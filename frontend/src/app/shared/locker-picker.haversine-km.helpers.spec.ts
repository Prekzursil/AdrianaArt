import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-haversine-km — haversineKm. */
describe('LockerPickerComponent haversineKm (golden WU)', () => {
  it('returns ~0 for same point and positive distance otherwise', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    expect((cmp as any).haversineKm(44.4, 26.1, 44.4, 26.1)).toBeCloseTo(0, 6);
    const d = (cmp as any).haversineKm(44.4, 26.1, 44.5, 26.2);
    expect(d).toBeGreaterThan(10);
    expect(d).toBeLessThan(20);
  });
});
