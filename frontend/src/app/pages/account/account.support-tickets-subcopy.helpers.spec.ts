import { AccountState } from './account.state';

/** Golden WU account-support-tickets-subcopy — supportTicketsSubcopy. */
describe('AccountState supportTicketsSubcopy (golden WU)', () => {
  function bare(opts: Record<string, unknown>): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      t: (k: string) => k,
      ticketsLoading: () => false,
      ticketsLoaded: () => true,
      ticketsError: () => null,
      tickets: () => [{ id: '1' }],
      ...opts,
    });
    return cmp;
  }

  it('covers loading, unloaded, error, empty, and hint copy', () => {
    expect(bare({
      ticketsLoading: () => true,
      ticketsLoaded: () => false,
    }).supportTicketsSubcopy()).toBe('notifications.loading');
    expect(bare({ ticketsLoaded: () => false }).supportTicketsSubcopy()).toBe('');
    expect(bare({ ticketsError: () => 'x' }).supportTicketsSubcopy()).toBe(
      'account.overview.support.loadErrorCopy',
    );
    expect(bare({ tickets: () => [] }).supportTicketsSubcopy()).toBe(
      'account.overview.support.noneCopy',
    );
    expect(bare({}).supportTicketsSubcopy()).toBe('account.overview.support.hint');
  });
});
