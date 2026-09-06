import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-bulk-emails-preview -- bulkEmailsPreview. */
describe('AdminCouponsComponent bulkEmailsPreview (golden WU)', () => {
  it('returns empty string when there are no bulk emails', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, { bulkEmails: [] });
    expect(cmp.bulkEmailsPreview()).toBe('');
  });
});
