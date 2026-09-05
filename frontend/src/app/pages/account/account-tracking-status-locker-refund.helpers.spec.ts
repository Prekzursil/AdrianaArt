import { AccountState } from './account.state';
import type { Order } from '../../core/account.service';

describe('AccountState trackingStatus / locker / refund helpers (golden WU)', () => {
  function createState(): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    (state as any).translate = {
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
      delivery_type: 'home',
      tracking_number: 'TRK1',
      locker_name: '',
      locker_address: '',
      events: [],
      ...overrides,
    } as Order;
  }

  it('trackingStatusLabel requires tracking and maps delivered/shipped statuses', () => {
    const state = createState();
    expect(state.trackingStatusLabel(order({ tracking_number: '' }))).toBeNull();
    expect(state.trackingStatusLabel(order({ tracking_number: '   ' }))).toBeNull();
    expect(state.trackingStatusLabel(order({ status: 'delivered', tracking_number: 'X' }))).toBe(
      'tr:account.orders.trackingStatus.delivered',
    );
    expect(state.trackingStatusLabel(order({ status: 'shipped', tracking_number: 'X' }))).toBe(
      'tr:account.orders.trackingStatus.inTransit',
    );
    expect(state.trackingStatusLabel(order({ status: 'paid', tracking_number: 'X' }))).toBeNull();
  });

  it('lockerLabel returns name/address detail only for locker deliveries', () => {
    const state = createState();
    expect(state.lockerLabel(order({ delivery_type: 'home' }))).toBeNull();
    expect(
      state.lockerLabel(order({ delivery_type: 'locker', locker_name: '', locker_address: '' })),
    ).toBeNull();
    expect(
      state.lockerLabel(
        order({ delivery_type: 'locker', locker_name: 'Box A', locker_address: '' }),
      ),
    ).toBe('Box A');
    expect(
      state.lockerLabel(
        order({ delivery_type: 'locker', locker_name: 'Box A', locker_address: 'Str. 1' }),
      ),
    ).toBe('Box A — Str. 1');
  });

  it('manualRefundRequired needs cancelled+stripe/paypal+captured without refund', () => {
    const state = createState();
    expect(state.manualRefundRequired(order({ status: 'paid' }))).toBeFalse();
    expect(
      state.manualRefundRequired(
        order({
          status: 'cancelled',
          payment_method: 'cod',
          events: [{ event: 'payment_captured' } as any],
        }),
      ),
    ).toBeFalse();
    expect(
      state.manualRefundRequired(
        order({
          status: 'cancelled',
          payment_method: 'stripe',
          events: [{ event: 'payment_captured' } as any],
        }),
      ),
    ).toBeTrue();
    expect(
      state.manualRefundRequired(
        order({
          status: 'cancelled',
          payment_method: 'paypal',
          events: [{ event: 'payment_captured' } as any, { event: 'payment_refunded' } as any],
        }),
      ),
    ).toBeFalse();
    expect(
      state.manualRefundRequired(
        order({ status: 'cancelled', payment_method: 'stripe', events: [] }),
      ),
    ).toBeFalse();
  });
});
