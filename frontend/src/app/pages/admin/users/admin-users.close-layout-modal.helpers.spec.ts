import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-close-layout-modal -- closeLayoutModal. */
describe('AdminUsersComponent closeLayoutModal (golden WU)', () => {
  it('sets layoutModalOpen false', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      layoutModalOpen: { set: jasmine.createSpy('set') },
    });
    cmp.closeLayoutModal();
    expect((cmp as any).layoutModalOpen.set).toHaveBeenCalledWith(false);
  });
});
