import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-track-location — trackLocation. */
describe('LockerPickerComponent trackLocation (golden WU)', () => {
  it('joins lat lng and display name', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    expect(
      cmp.trackLocation(0, { lat: 44.4, lng: 26.1, display_name: 'Bucharest' } as any),
    ).toBe('44.4,26.1,Bucharest');
  });
});
