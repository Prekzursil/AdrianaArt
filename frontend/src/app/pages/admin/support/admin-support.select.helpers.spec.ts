import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-select -- select. */
describe('AdminSupportComponent select (golden WU)', () => {
  it('opens ticket with pushHistory true', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, { openTicket: jasmine.createSpy('openTicket') });
    cmp.select({ id: 't1' } as any);
    expect((cmp as any).openTicket).toHaveBeenCalledWith('t1', true);
  });
});
