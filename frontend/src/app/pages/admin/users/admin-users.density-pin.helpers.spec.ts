import { signal } from '@angular/core';
import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-density-pin-helpers. */
describe('AdminUsersComponent density/pin helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      tableLayout: signal({ density: 'comfortable' }),
      applyTableLayout: jasmine.createSpy('apply'),
      favorites: { isFavorite: () => true },
      currentViewFavoriteKey: () => 'view:users',
      ...overrides,
    });
    return cmp;
  }

  it('toggleDensity flips to compact from comfortable', () => {
    const cmp = bare();
    cmp.toggleDensity();
    expect((cmp as any).applyTableLayout).toHaveBeenCalledWith(
      jasmine.objectContaining({ density: 'compact' }),
    );
    expect(cmp.densityToggleLabelKey()).toContain('toCompact');
  });

  it('isCurrentViewPinned uses favorites', () => {
    expect(bare().isCurrentViewPinned()).toBe(true);
    expect(bare({ favorites: { isFavorite: () => false } }).isCurrentViewPinned()).toBe(false);
  });
});
