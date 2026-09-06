import { AccountState } from './account.state';

/** Golden WU delivery-label -- deliveryLabel. */
describe('AccountState deliveryLabel (golden WU)', () => {
  function bare(): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { t: (k: string) => k });
    return cmp;
  }

  it('joins courier and delivery type labels', () => {
    expect(
      bare().deliveryLabel({ courier: 'sameday', delivery_type: 'home' } as any),
    ).toBe('Sameday · account.orders.delivery.home');
    expect(
      bare().deliveryLabel({ courier: 'fan_courier', delivery_type: 'locker' } as any),
    ).toBe('Fan Courier · account.orders.delivery.locker');
    expect(bare().deliveryLabel({ courier: '', delivery_type: '' } as any)).toBe('—');
  });
});
