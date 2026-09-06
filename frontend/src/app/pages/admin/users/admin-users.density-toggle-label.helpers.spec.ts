import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-density-toggle-label — densityToggleLabelKey. */
describe('AdminUsersComponent densityToggleLabelKey (golden WU)', () => {
  it('returns the opposite density label key', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).tableLayout = () => ({ density: 'compact' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toComfortable');
    (cmp as any).tableLayout = () => ({ density: 'comfortable' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toCompact');
  });
});
