import { AccountState } from './account.state';

/** Golden WU has-return-requested -- hasReturnRequested. */
describe('AccountState hasReturnRequested (golden WU)', () => {
  it('checks the returnRequestedOrderIds set', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { returnRequestedOrderIds: new Set(['a']) });
    expect(cmp.hasReturnRequested({ id: 'a' } as any)).toBeTrue();
    expect(cmp.hasReturnRequested({ id: 'b' } as any)).toBeFalse();
  });
});
