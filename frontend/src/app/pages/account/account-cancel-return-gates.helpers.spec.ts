import { AccountState } from './account.state';
import type { Order } from '../../core/account.service';

describe('AccountState cancel/return gate helpers (golden WU)', () => {
  function createState(): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    (state as any).cancelRequestedOrderIds = new Set<string>();
    (state as any).returnRequestedOrderIds = new Set<string>();
    return state;
  }

  function order(overrides: Partial<Order> = {}): Order {
    return {
      id: 'o1',
      status: 'paid',
      events: [],
      ...overrides,
    } as Order;
  }

  it('canRequestCancel allows pending/paid and blocks other statuses', () => {
    const state = createState();
    expect(state.canRequestCancel(order({ status: 'pending_payment' }))).toBeTrue();
    expect(state.canRequestCancel(order({ status: 'pending_acceptance' }))).toBeTrue();
    expect(state.canRequestCancel(order({ status: 'paid' }))).toBeTrue();
    expect(state.canRequestCancel(order({ status: 'shipped' }))).toBeFalse();
    expect(state.canRequestCancel(order({ status: 'delivered' }))).toBeFalse();
  });

  it('hasCancelRequested checks local set and cancel_requested events', () => {
    const state = createState();
    expect(state.hasCancelRequested(order())).toBeFalse();
    (state as any).cancelRequestedOrderIds.add('o1');
    expect(state.hasCancelRequested(order())).toBeTrue();
    (state as any).cancelRequestedOrderIds.clear();
    expect(
      state.hasCancelRequested(
        order({
          events: [{ event: 'cancel_requested' } as any],
        }),
      ),
    ).toBeTrue();
    expect(state.canRequestCancel(order({ status: 'paid', events: [{ event: 'cancel_requested' } as any] }))).toBeFalse();
  });

  it('canRequestReturn only for delivered orders without a prior return request', () => {
    const state = createState();
    expect(state.canRequestReturn(order({ status: 'delivered' }))).toBeTrue();
    expect(state.canRequestReturn(order({ status: 'shipped' }))).toBeFalse();
    (state as any).returnRequestedOrderIds.add('o1');
    expect(state.canRequestReturn(order({ status: 'delivered' }))).toBeFalse();
    expect(state.hasReturnRequested(order({ status: 'delivered' }))).toBeTrue();
  });
});
