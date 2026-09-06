import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent minSubtotalShortfall (golden WU)', () => {
  function bare(subtotal: number) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).quoteSubtotal = () => subtotal;
    return cmp;
  }

  it('returns null without min_subtotal_not_met or invalid min', () => {
    const cmp = bare(50);
    expect(cmp.minSubtotalShortfall(null)).toBeNull();
    expect(cmp.minSubtotalShortfall({ reasons: [] } as any)).toBeNull();
    expect(
      cmp.minSubtotalShortfall({
        reasons: ['min_subtotal_not_met'],
        coupon: { promotion: { min_subtotal: '0' } },
      } as any),
    ).toBeNull();
  });

  it('computes remaining and progress when short', () => {
    const cmp = bare(40);
    expect(
      cmp.minSubtotalShortfall({
        reasons: ['min_subtotal_not_met'],
        coupon: { promotion: { min_subtotal: '100' } },
      } as any),
    ).toEqual({ min: 100, remaining: 60, progress: 0.4 });
  });

  it('returns null when current meets min', () => {
    const cmp = bare(120);
    expect(
      cmp.minSubtotalShortfall({
        reasons: ['min_subtotal_not_met'],
        coupon: { promotion: { min_subtotal: '100' } },
      } as any),
    ).toBeNull();
  });
});
