import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-is-current-view-pinned -- isCurrentViewPinned. */
describe('AdminUsersComponent isCurrentViewPinned (golden WU)', () => {
  it('asks favorites.isFavorite with currentViewFavoriteKey', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      currentViewFavoriteKey: jasmine.createSpy('currentViewFavoriteKey').and.returnValue('users:v1'),
      favorites: { isFavorite: jasmine.createSpy('isFavorite').and.returnValue(true) },
    });
    expect(cmp.isCurrentViewPinned()).toBe(true);
    expect((cmp as any).favorites.isFavorite).toHaveBeenCalledWith('users:v1');
  });
});
