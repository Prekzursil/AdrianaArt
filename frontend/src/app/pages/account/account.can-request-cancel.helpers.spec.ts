import { AccountState } from './account.state';

/** Golden WU account-can-request-cancel — canRequestCancel. */
describe('AccountState canRequestCancel (golden WU)', () => {
  it('allows early statuses without prior cancel request', () => {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      hasCancelRequested: (o: any) => o.id === 'taken',
    });
    expect(state.canRequestCancel({ id: 'a', status: 'paid' } as any)).toBe(true);
    expect(
      state.canRequestCancel({ id: 'a', status: 'pending_payment' } as any),
    ).toBe(true);
    expect(state.canRequestCancel({ id: 'taken', status: 'paid' } as any)).toBe(false);
    expect(state.canRequestCancel({ id: 'a', status: 'shipped' } as any)).toBe(false);
  });
});
