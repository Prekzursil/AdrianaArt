import { SuccessComponent } from './success.component';

/** Golden WU success-courier-label — courierLabel. */
describe('SuccessComponent courierLabel (golden WU)', () => {
  it('maps known couriers; falls back to trimmed raw or null', () => {
    const cmp = Object.create(SuccessComponent.prototype) as SuccessComponent;
    Object.assign(cmp as any, { summary: null });
    expect(cmp.courierLabel()).toBeNull();
    Object.assign(cmp as any, { summary: { courier: 'fan_courier' } });
    expect(cmp.courierLabel()).toBe('Fan Courier');
    Object.assign(cmp as any, { summary: { courier: '  SAMEDAY  ' } });
    expect(cmp.courierLabel()).toBe('Sameday');
    Object.assign(cmp as any, { summary: { courier: '  DHL  ' } });
    expect(cmp.courierLabel()).toBe('DHL');
    Object.assign(cmp as any, { summary: { courier: '   ' } });
    expect(cmp.courierLabel()).toBeNull();
  });
});
