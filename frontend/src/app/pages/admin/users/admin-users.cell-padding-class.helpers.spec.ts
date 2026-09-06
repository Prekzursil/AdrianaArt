import { signal } from '@angular/core';
import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-cell-padding-class — cellPaddingClass. */
describe('AdminUsersComponent cellPaddingClass (golden WU)', () => {
  function bare(density: 'compact' | 'comfortable'): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, { tableLayout: signal({ density }) });
    return cmp;
  }

  it('maps density to padding classes', () => {
    expect(bare('compact').cellPaddingClass()).toBe('px-3 py-1.5');
    expect(bare('comfortable').cellPaddingClass()).toBe('px-3 py-2');
  });
});
