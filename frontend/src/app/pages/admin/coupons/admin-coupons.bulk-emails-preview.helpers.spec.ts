import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-bulk-emails-preview-helpers. */
describe('AdminCouponsComponent bulkEmailsPreview (golden WU)', () => {
  function bare(emails: string[]): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, { bulkEmails: emails });
    return cmp;
  }

  it('bulkEmailsPreview truncates after six', () => {
    expect(bare([]).bulkEmailsPreview()).toBe('');
    expect(bare(['a@b.c', 'd@e.f']).bulkEmailsPreview()).toBe('a@b.c, d@e.f');
    const many = Array.from({ length: 8 }, (_, i) => `${i}@x.com`);
    expect(bare(many).bulkEmailsPreview()).toBe(`${many.slice(0, 6).join(', ')}…`);
  });
});
