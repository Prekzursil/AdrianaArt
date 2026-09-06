import { AccountState } from './account.state';

/** Golden WU manual-refund-required -- manualRefundRequired. */
describe('AccountState manualRefundRequired (golden WU)', () => {
  const cmp = Object.create(AccountState.prototype) as AccountState;

  it('requires cancelled+captured unpaid stripe/paypal refunds', () => {
    expect(
      cmp.manualRefundRequired({
        status: 'cancelled',
        payment_method: 'stripe',
        events: [{ event: 'payment_captured' }],
      } as any),
    ).toBeTrue();
    expect(
      cmp.manualRefundRequired({
        status: 'cancelled',
        payment_method: 'stripe',
        events: [{ event: 'payment_captured' }, { event: 'payment_refunded' }],
      } as any),
    ).toBeFalse();
    expect(
      cmp.manualRefundRequired({
        status: 'paid',
        payment_method: 'stripe',
        events: [{ event: 'payment_captured' }],
      } as any),
    ).toBeFalse();
  });
});
