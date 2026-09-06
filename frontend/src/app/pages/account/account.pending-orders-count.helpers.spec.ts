import { AccountState } from './account.state';

/** Golden WU account-pending-orders-count — pendingOrdersCount. */
describe('AccountState pendingOrdersCount (golden WU)', () => {
  it('reads pending_count from ordersMeta with zero fallback', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { ordersMeta: () => ({ pending_count: 3 }) });
    expect(cmp.pendingOrdersCount()).toBe(3);
    Object.assign(cmp as any, { ordersMeta: () => null });
    expect(cmp.pendingOrdersCount()).toBe(0);
  });
});
