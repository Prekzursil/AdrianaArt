import { AccountState } from './account.state';

/** Golden WU has-cancel-requested -- hasCancelRequested. */
describe('AccountState hasCancelRequested (golden WU)', () => {
  function bare(ids: string[] = []): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { cancelRequestedOrderIds: new Set(ids) });
    return cmp;
  }

  it('detects set membership and cancel_requested events', () => {
    expect(bare(['x']).hasCancelRequested({ id: 'x', events: [] } as any)).toBeTrue();
    expect(
      bare().hasCancelRequested({
        id: 'y',
        events: [{ event: 'cancel_requested' }],
      } as any),
    ).toBeTrue();
    expect(bare().hasCancelRequested({ id: 'z', events: [] } as any)).toBeFalse();
  });
});
