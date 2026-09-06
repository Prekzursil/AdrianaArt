import { AccountState } from './account.state';

/** Golden WU tracking-status-label -- trackingStatusLabel. */
describe('AccountState trackingStatusLabel (golden WU)', () => {
  function bare(): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { t: (k: string) => k });
    return cmp;
  }

  it('labels shipped/delivered tracking and ignores missing numbers', () => {
    expect(bare().trackingStatusLabel({ tracking_number: '', status: 'shipped' } as any)).toBeNull();
    expect(
      bare().trackingStatusLabel({ tracking_number: 'X', status: 'delivered' } as any),
    ).toBe('account.orders.trackingStatus.delivered');
    expect(
      bare().trackingStatusLabel({ tracking_number: 'X', status: 'shipped' } as any),
    ).toBe('account.orders.trackingStatus.inTransit');
    expect(
      bare().trackingStatusLabel({ tracking_number: 'X', status: 'paid' } as any),
    ).toBeNull();
  });
});
