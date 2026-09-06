import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-apply-saved-view -- applySavedView. */
describe('AdminUsersComponent applySavedView (golden WU)', () => {
  it('returns early when key is empty', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedSavedViewKey: 'x',
      savedViews: jasmine.createSpy('savedViews'),
      load: jasmine.createSpy('load'),
    });
    cmp.applySavedView('');
    expect((cmp as any).selectedSavedViewKey).toBe('');
    expect((cmp as any).savedViews).not.toHaveBeenCalled();
    expect((cmp as any).load).not.toHaveBeenCalled();
  });
});
