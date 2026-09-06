import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-identity-label — identityLabel via formatIdentity. */
describe('AdminUsersComponent identityLabel (golden WU)', () => {
  it('formats name#tag (username), else falls back through email', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    expect(
      cmp.identityLabel({
        name: 'Ada',
        username: 'ada',
        name_tag: 1,
        email: 'ada@x',
      } as any),
    ).toBe('Ada#1 (ada)');
    expect(
      cmp.identityLabel({ name: '', username: '', name_tag: null, email: 'ada@x' } as any),
    ).toBe('ada@x');
  });
});
