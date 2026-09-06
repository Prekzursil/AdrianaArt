import { signal } from '@angular/core';
import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-density-toggle-label-key — densityToggleLabelKey. */
describe('AdminUsersComponent densityToggleLabelKey (golden WU)', () => {
  function bare(density: 'compact' | 'comfortable'): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, { tableLayout: signal({ density }) });
    return cmp;
  }

  it('flips label by density', () => {
    expect(bare('compact').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toComfortable',
    );
    expect(bare('comfortable').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toCompact',
    );
  });
});
