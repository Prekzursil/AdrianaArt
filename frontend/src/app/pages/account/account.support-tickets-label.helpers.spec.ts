import { AccountState } from './account.state';

/** Golden WU account-support-tickets-label — supportTicketsLabel. */
describe('AccountState supportTicketsLabel (golden WU)', () => {
  function bare(opts: Record<string, unknown>): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      t: (k: string, p?: any) => (p ? `${k}:${p.count}` : k),
      ticketsLoading: () => false,
      ticketsLoaded: () => true,
      ticketsError: () => null,
      tickets: () => [],
      ...opts,
    });
    return cmp;
  }

  it('covers loading, error, empty, resolved, and open counts', () => {
    expect(bare({
      ticketsLoading: () => true,
      ticketsLoaded: () => false,
    }).supportTicketsLabel()).toBe('notifications.loading');
    expect(bare({ ticketsLoaded: () => false }).supportTicketsLabel()).toBe('...');
    expect(bare({ ticketsError: () => 'err.x' }).supportTicketsLabel()).toBe('err.x');
    expect(bare({}).supportTicketsLabel()).toBe('account.overview.support.none');
    expect(bare({
      tickets: () => [{ status: 'resolved' }, { status: 'Resolved' }],
    }).supportTicketsLabel()).toBe('account.overview.support.allResolved');
    expect(bare({
      tickets: () => [{ status: 'open' }],
    }).supportTicketsLabel()).toBe('account.overview.support.openOne');
    expect(bare({
      tickets: () => [{ status: 'open' }, { status: 'pending' }],
    }).supportTicketsLabel()).toBe('account.overview.support.openMany:2');
  });
});
