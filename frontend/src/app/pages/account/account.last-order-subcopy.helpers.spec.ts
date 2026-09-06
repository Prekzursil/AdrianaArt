import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-last-order-subcopy — lastOrderSubcopy. */
describe('AccountState lastOrderSubcopy (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      ordersLoading: signal(false),
      ordersLoaded: signal(true),
      lastOrder: () => null,
      formatMoney: (amount: number, currency: string) => `${amount.toFixed(2)} ${currency}`,
      t: (key: string) => key,
      ...overrides,
    });
    return state;
  }

  it('covers loading empty no-order and money+date arms', () => {
    expect(
      bare({ ordersLoading: signal(true), ordersLoaded: signal(false) }).lastOrderSubcopy(),
    ).toBe('notifications.loading');
    expect(bare({ ordersLoaded: signal(false) }).lastOrderSubcopy()).toBe('');
    expect(bare().lastOrderSubcopy()).toBe('account.overview.noOrdersCopy');
    const withDate = bare({
      lastOrder: () => ({
        total_amount: 12.5,
        currency: 'RON',
        created_at: '2024-01-15T12:00:00Z',
      }),
    }).lastOrderSubcopy();
    expect(withDate.startsWith('12.50 RON')).toBe(true);
    expect(withDate).toContain(' · ');
    expect(
      bare({
        lastOrder: () => ({ total_amount: 1, currency: 'EUR', created_at: '' }),
      }).lastOrderSubcopy(),
    ).toBe('1.00 EUR');
  });
});
