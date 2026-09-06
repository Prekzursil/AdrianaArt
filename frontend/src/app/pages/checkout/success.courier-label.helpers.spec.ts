import { SuccessComponent } from './success.component';

/** Golden WU checkout-success-courier-label — courierLabel. */
describe('SuccessComponent courierLabel (golden WU)', () => {
  function bare(summary: any): SuccessComponent {
    const cmp = Object.create(SuccessComponent.prototype) as SuccessComponent;
    Object.assign(cmp as any, { summary });
    return cmp;
  }

  it('maps known couriers and falls back to raw/null', () => {
    expect(bare(null).courierLabel()).toBeNull();
    expect(bare({ courier: 'fan_courier' }).courierLabel()).toBe('Fan Courier');
    expect(bare({ courier: 'Sameday' }).courierLabel()).toBe('Sameday');
    expect(bare({ courier: '  Other Co  ' }).courierLabel()).toBe('Other Co');
    expect(bare({ courier: '   ' }).courierLabel()).toBeNull();
  });
});
