import { AccountState } from './account.state';

/** Golden WU payment-method-label -- paymentMethodLabel. */
describe('AccountState paymentMethodLabel (golden WU)', () => {
  function bare(): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => k },
    });
    return cmp;
  }

  it('maps known methods and uppercases unknowns', () => {
    expect(bare().paymentMethodLabel({ payment_method: 'stripe' } as any)).toBe(
      'adminUi.orders.paymentStripe',
    );
    expect(bare().paymentMethodLabel({ payment_method: 'cod' } as any)).toBe(
      'adminUi.orders.paymentCod',
    );
    expect(bare().paymentMethodLabel({ payment_method: 'wire' } as any)).toBe('WIRE');
    expect(bare().paymentMethodLabel({ payment_method: '' } as any)).toBe('—');
  });
});
