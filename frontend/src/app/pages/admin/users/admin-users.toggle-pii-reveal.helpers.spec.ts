import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-toggle-pii-reveal -- togglePiiReveal. */
describe('AdminUsersComponent togglePiiReveal (golden WU)', () => {
  it('returns early when cannot reveal PII', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      canRevealPii: jasmine.createSpy('can').and.returnValue(false),
      piiReveal: { set: jasmine.createSpy('set') },
      load: jasmine.createSpy('load'),
    });
    cmp.togglePiiReveal();
    expect((cmp as any).piiReveal.set).not.toHaveBeenCalled();
    expect((cmp as any).load).not.toHaveBeenCalled();
  });
});
