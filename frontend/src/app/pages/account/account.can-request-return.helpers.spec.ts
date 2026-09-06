import { AccountState } from './account.state';

/** Golden WU can-request-return -- canRequestReturn. */
describe('AccountState canRequestReturn (golden WU)', () => {
  function bare(ids: string[] = []): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { returnRequestedOrderIds: new Set(ids) });
    return cmp;
  }

  it('allows delivered orders without a prior return request', () => {
    expect(bare().canRequestReturn({ id: '1', status: 'delivered' } as any)).toBeTrue();
    expect(bare(['1']).canRequestReturn({ id: '1', status: 'delivered' } as any)).toBeFalse();
    expect(bare().canRequestReturn({ id: '1', status: 'shipped' } as any)).toBeFalse();
  });
});
