import { AccountState } from './account.state';

/** Golden WU orders-filters-active -- ordersFiltersActive. */
describe('AccountState ordersFiltersActive (golden WU)', () => {
  function bare(fields: Record<string, string>): AccountState {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      orderFilter: '',
      ordersQuery: '',
      ordersFrom: '',
      ordersTo: '',
      ...fields,
    });
    return cmp;
  }

  it('is true when any filter field is non-empty', () => {
    expect(bare({}).ordersFiltersActive()).toBeFalse();
    expect(bare({ orderFilter: 'paid' }).ordersFiltersActive()).toBeTrue();
    expect(bare({ ordersQuery: 'abc' }).ordersFiltersActive()).toBeTrue();
    expect(bare({ ordersFrom: '2026-01-01' }).ordersFiltersActive()).toBeTrue();
  });
});
