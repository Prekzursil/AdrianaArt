import { AdminSupportComponent } from './admin-support.component';

describe('AdminSupportComponent canEditSlaSettings (golden WU)', () => {
  it('allows owner/admin; denies other roles', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).auth = { role: () => 'owner' };
    expect(cmp.canEditSlaSettings()).toBe(true);
    (cmp as any).auth = { role: () => 'admin' };
    expect(cmp.canEditSlaSettings()).toBe(true);
    (cmp as any).auth = { role: () => 'editor' };
    expect(cmp.canEditSlaSettings()).toBe(false);
    (cmp as any).auth = { role: () => null };
    expect(cmp.canEditSlaSettings()).toBe(false);
  });
});
