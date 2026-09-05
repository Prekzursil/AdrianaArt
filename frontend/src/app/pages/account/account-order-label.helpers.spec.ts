import { AccountState } from './account.state';
import type { Order } from '../../core/account.service';

describe('AccountState order label helpers (golden WU)', () => {
  function createState() {
    const state = Object.create(AccountState.prototype) as AccountState & {
      translate: { instant: (key: string, params?: Record<string, unknown>) => string };
    };
    state.translate = {
      instant: (key: string, params?: Record<string, unknown>) =>
        params ? `tr:${key}:${JSON.stringify(params)}` : `tr:${key}`,
    };
    return state;
  }

  function order(overrides: Partial<Order> = {}): Order {
    return {
      id: 'o1',
      status: 'shipped',
      payment_method: 'stripe',
      courier: 'sameday',
      delivery_type: 'home',
      tracking_number: 'TRK1',
      ...overrides,
    } as Order;
  }

  it('trackingUrl encodes tracking numbers and blanks empty input', () => {
    const state = createState();
    expect(state.trackingUrl('')).toBe('');
    expect(state.trackingUrl('   ')).toBe('');
    expect(state.trackingUrl('AB 12')).toBe(
      'https://t.17track.net/en#nums=' + encodeURIComponent('AB 12'),
    );
  });

  it('paymentMethodLabel maps known methods via translate and falls back otherwise', () => {
    const state = createState();
    expect(state.paymentMethodLabel(order({ payment_method: 'stripe' }))).toBe(
      'tr:adminUi.orders.paymentStripe',
    );
    expect(state.paymentMethodLabel(order({ payment_method: 'paypal' }))).toBe(
      'tr:adminUi.orders.paymentPaypal',
    );
    expect(state.paymentMethodLabel(order({ payment_method: 'cod' }))).toBe(
      'tr:adminUi.orders.paymentCod',
    );
    expect(state.paymentMethodLabel(order({ payment_method: 'netopia' }))).toBe(
      'tr:adminUi.orders.paymentNetopia',
    );
    expect(state.paymentMethodLabel(order({ payment_method: 'wire' }))).toBe('WIRE');
    expect(state.paymentMethodLabel(order({ payment_method: '' }))).toBe('—');
  });

  it('deliveryLabel joins courier + delivery type and defaults to em dash', () => {
    const state = createState();
    expect(state.deliveryLabel(order({ courier: 'sameday', delivery_type: 'home' }))).toBe(
      'Sameday · tr:account.orders.delivery.home',
    );
    expect(state.deliveryLabel(order({ courier: 'fan_courier', delivery_type: 'locker' }))).toBe(
      'Fan Courier · tr:account.orders.delivery.locker',
    );
    expect(state.deliveryLabel(order({ courier: '', delivery_type: '' }))).toBe('—');
    expect(state.deliveryLabel(order({ courier: 'other', delivery_type: 'pickup' }))).toBe(
      'other · pickup',
    );
  });
});
