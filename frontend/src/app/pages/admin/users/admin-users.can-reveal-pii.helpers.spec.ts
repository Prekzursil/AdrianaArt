import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-can-reveal-pii — canRevealPii. */
describe('AdminUsersComponent canRevealPii (golden WU)', () => {
  function bare(role: string | null): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, { auth: { role: () => role } });
    return cmp;
  }

  it('allows owner admin support fulfillment only', () => {
    expect(bare('owner').canRevealPii()).toBe(true);
    expect(bare('admin').canRevealPii()).toBe(true);
    expect(bare('support').canRevealPii()).toBe(true);
    expect(bare('fulfillment').canRevealPii()).toBe(true);
    expect(bare('viewer').canRevealPii()).toBe(false);
    expect(bare(null).canRevealPii()).toBe(false);
  });
});
