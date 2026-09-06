import { AccountState } from './account.state';

/** Golden WU account-can-request-return — canRequestReturn. */
describe('AccountState canRequestReturn (golden WU)', () => {
  it('requires delivered status without prior return request', () => {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      hasReturnRequested: (o: any) => o.id === 'taken',
    });
    expect(state.canRequestReturn({ id: 'a', status: 'delivered' } as any)).toBe(true);
    expect(state.canRequestReturn({ id: 'taken', status: 'delivered' } as any)).toBe(
      false,
    );
    expect(state.canRequestReturn({ id: 'a', status: 'shipped' } as any)).toBe(false);
  });
});
