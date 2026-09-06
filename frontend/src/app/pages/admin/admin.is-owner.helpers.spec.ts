import { AdminComponent } from './admin.component';

/** Golden WU admin-is-owner — isOwner. */
describe('AdminComponent isOwner (golden WU)', () => {
  function bare(role: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { auth: { role: () => role } });
    return cmp;
  }

  it('is true only for owner role', () => {
    expect(bare('owner').isOwner()).toBe(true);
    expect(bare('admin').isOwner()).toBe(false);
    expect(bare('staff').isOwner()).toBe(false);
  });
});
