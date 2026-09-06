import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU gdpr-can-admin-actions — canAdminActions. */
describe('AdminGdprComponent canAdminActions (golden WU)', () => {
  it('delegates to auth.isAdmin()', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    (cmp as any).auth = { isAdmin: () => false };
    expect(cmp.canAdminActions()).toBe(false);
    (cmp as any).auth = { isAdmin: () => true };
    expect(cmp.canAdminActions()).toBe(true);
  });
});
