import { AccountState } from './account.state';

/** Golden WU account-has-return-requested — hasReturnRequested. */
describe('AccountState hasReturnRequested (golden WU)', () => {
  it('true when order id is in returnRequestedOrderIds', () => {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      returnRequestedOrderIds: new Set(['o1']),
    });
    expect(state.hasReturnRequested({ id: 'o1' } as any)).toBe(true);
    expect(state.hasReturnRequested({ id: 'o2' } as any)).toBe(false);
  });
});
