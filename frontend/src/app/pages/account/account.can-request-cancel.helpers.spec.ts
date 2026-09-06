import { AccountState } from './account.state';

/** Golden WU can-request-cancel -- canRequestCancel. */
describe('AccountState canRequestCancel (golden WU)', () => {
  function bare(ids: string[] = []): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { cancelRequestedOrderIds: new Set(ids) });
    return cmp;
  }

  it('allows early statuses without a prior cancel request', () => {
    expect(bare().canRequestCancel({ id: '1', status: 'paid', events: [] } as any)).toBeTrue();
    expect(
      bare().canRequestCancel({ id: '1', status: 'pending_payment', events: [] } as any),
    ).toBeTrue();
    expect(bare(['1']).canRequestCancel({ id: '1', status: 'paid', events: [] } as any)).toBeFalse();
    expect(bare().canRequestCancel({ id: '1', status: 'shipped', events: [] } as any)).toBeFalse();
  });
});
