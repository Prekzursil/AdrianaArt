import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-session-device-label — sessionDeviceLabel. */
describe('AdminUsersComponent sessionDeviceLabel (golden WU)', () => {
  it('unknown when empty; truncates long UA with ellipsis', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).t = (k: string) => `T:${k}`;
    expect(cmp.sessionDeviceLabel({ user_agent: '' } as any)).toBe('T:adminUi.users.unknownDevice');
    expect(cmp.sessionDeviceLabel({ user_agent: '  ' } as any)).toBe('T:adminUi.users.unknownDevice');
    expect(cmp.sessionDeviceLabel({ user_agent: 'Mozilla/5.0 Short' } as any)).toBe(
      'Mozilla/5.0 Short',
    );
    const long = 'x'.repeat(141);
    expect(cmp.sessionDeviceLabel({ user_agent: long } as any)).toBe(`${'x'.repeat(140)}…`);
  });
});
