import { signal } from '@angular/core';
import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-select-status-helpers. */
describe('AdminReturnsComponent openStatusList (golden WU)', () => {
  it('openStatusList switches to list and loads', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      viewMode: signal('board'),
      statusFilter: 'all',
      page: 3,
      load: jasmine.createSpy('load'),
    });
    cmp.openStatusList('approved' as any);
    expect((cmp as any).viewMode()).toBe('list');
    expect((cmp as any).statusFilter).toBe('approved');
    expect((cmp as any).page).toBe(1);
    expect((cmp as any).load).toHaveBeenCalledWith(false);
  });
});
