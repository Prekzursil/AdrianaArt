import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-can-issue-coupons — canIssueCoupons. */
describe('AdminUsersComponent canIssueCoupons (golden WU)', () => {
  it('checks coupons admin section access', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    const calls: string[] = [];
    Object.assign(cmp as any, {
      auth: {
        canAccessAdminSection: (s: string) => {
          calls.push(s);
          return s === 'coupons';
        },
      },
    });
    expect(cmp.canIssueCoupons()).toBe(true);
    expect(calls).toEqual(['coupons']);
  });
});
