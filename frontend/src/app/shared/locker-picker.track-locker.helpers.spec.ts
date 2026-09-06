import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-track-locker — trackLocker. */
describe('LockerPickerComponent trackLocker (golden WU)', () => {
  it('returns the locker id', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    expect(cmp.trackLocker(0, { id: 'L1' } as any)).toBe('L1');
    expect(cmp.trackLocker(3, { id: 'L9' } as any)).toBe('L9');
  });
});
