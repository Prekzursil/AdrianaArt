import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-clear-selected-location — clearSelectedLocation. */
describe('LockerPickerComponent clearSelectedLocation (golden WU)', () => {
  it('nulls selectedLocation', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    Object.assign(cmp as any, { selectedLocation: { id: 'loc-1' } });
    cmp.clearSelectedLocation();
    expect((cmp as any).selectedLocation).toBeNull();
  });
});
