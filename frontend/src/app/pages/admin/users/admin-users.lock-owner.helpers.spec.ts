import { signal } from '@angular/core';
import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-lock-owner-helpers. */
describe('AdminUsersComponent lock/owner helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      profile: signal(null),
      auth: { role: () => 'admin' },
      ...overrides,
    });
    return cmp;
  }

  it('isLocked checks future locked_until', () => {
    expect(bare().isLocked()).toBe(false);
    expect(
      bare({
        profile: signal({ user: { locked_until: new Date(Date.now() + 60_000).toISOString() } }),
      }).isLocked(),
    ).toBe(true);
    expect(
      bare({
        profile: signal({ user: { locked_until: new Date(Date.now() - 60_000).toISOString() } }),
      }).isLocked(),
    ).toBe(false);
  });

  it('isOwner requires owner role', () => {
    expect(bare().isOwner()).toBe(false);
    expect(bare({ auth: { role: () => 'owner' } }).isOwner()).toBe(true);
  });
});
