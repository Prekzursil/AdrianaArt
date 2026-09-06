import { SuccessComponent } from './success.component';

/** Golden WU success-locker-label — lockerLabel. */
describe('SuccessComponent lockerLabel (golden WU)', () => {
  it('joins locker name/address only for locker delivery', () => {
    const cmp = Object.create(SuccessComponent.prototype) as SuccessComponent;
    Object.assign(cmp as any, { summary: null });
    expect(cmp.lockerLabel()).toBeNull();
    Object.assign(cmp as any, { summary: { delivery_type: 'home', locker_name: 'A', locker_address: 'B' } });
    expect(cmp.lockerLabel()).toBeNull();
    Object.assign(cmp as any, {
      summary: { delivery_type: 'locker', locker_name: ' EasyBox ', locker_address: ' Str. 1 ' },
    });
    expect(cmp.lockerLabel()).toBe(' EasyBox  —  Str. 1 ');
    Object.assign(cmp as any, { summary: { delivery_type: 'locker', locker_name: '  ', locker_address: '' } });
    expect(cmp.lockerLabel()).toBeNull();
  });
});
