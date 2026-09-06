import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-open-layout-modal -- openLayoutModal. */
describe('AdminUsersComponent openLayoutModal (golden WU)', () => {
  it('sets layoutModalOpen true', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      layoutModalOpen: { set: jasmine.createSpy('set') },
    });
    cmp.openLayoutModal();
    expect((cmp as any).layoutModalOpen.set).toHaveBeenCalledWith(true);
  });
});
