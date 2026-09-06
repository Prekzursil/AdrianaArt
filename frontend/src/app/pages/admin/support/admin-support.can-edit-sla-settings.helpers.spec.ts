import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-can-edit-sla-settings — canEditSlaSettings. */
describe('AdminSupportComponent canEditSlaSettings (golden WU)', () => {
  it('allows owner/admin only', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).auth = { role: () => 'staff' };
    expect(cmp.canEditSlaSettings()).toBe(false);
    (cmp as any).auth = { role: () => 'admin' };
    expect(cmp.canEditSlaSettings()).toBe(true);
    (cmp as any).auth = { role: () => 'owner' };
    expect(cmp.canEditSlaSettings()).toBe(true);
  });
});
