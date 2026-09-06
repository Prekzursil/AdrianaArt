import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-retry-load -- retryLoad. */
describe('AdminUsersComponent retryLoad (golden WU)', () => {
  it('delegates to load()', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, { load: jasmine.createSpy('load') });
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
