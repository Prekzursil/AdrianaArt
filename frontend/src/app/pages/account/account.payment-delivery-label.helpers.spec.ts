import { AccountState } from './account.state';

describe('AccountState paymentMethodLabel / deliveryLabel (golden WU)', () => {
  function bare() {
    const state = Object.create(AccountState.prototype) as AccountState;
    (state as any).translate = {
      instant: (key: string) => `T:${key}`,
    };
    (state as any).t = (key: string) => `T:${key}`;
    return state;
  }

  it('paymentMethodLabel maps known methods and falls back', () => {
    const s = bare();
    expect(s.paymentMethodLabel({ payment_method: 'stripe' } as any)).toBe(
      'T:adminUi.orders.paymentStripe',
    );
    expect(s.paymentMethodLabel({ payment_method: 'PayPal' } as any)).toBe(
      'T:adminUi.orders.paymentPaypal',
    );
    expect(s.paymentMethodLabel({ payment_method: 'cod' } as any)).toBe(
      'T:adminUi.orders.paymentCod',
    );
    expect(s.paymentMethodLabel({ payment_method: 'netopia' } as any)).toBe(
      'T:adminUi.orders.paymentNetopia',
    );
    expect(s.paymentMethodLabel({ payment_method: 'other' } as any)).toBe('OTHER');
    expect(s.paymentMethodLabel({ payment_method: '  ' } as any)).toBe('—');
  });

  it('deliveryLabel formats courier and delivery type', () => {
    const s = bare();
    expect(s.deliveryLabel({ courier: 'sameday', delivery_type: 'home' } as any)).toBe(
      'Sameday · T:account.orders.delivery.home',
    );
    expect(s.deliveryLabel({ courier: 'fan_courier', delivery_type: 'locker' } as any)).toBe(
      'Fan Courier · T:account.orders.delivery.locker',
    );
    expect(s.deliveryLabel({ courier: '', delivery_type: '' } as any)).toBe('—');
  });
});
