import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-global-search-active-descendant — globalSearchActiveDescendant. */
describe('AdminDashboardComponent globalSearchActiveDescendant (golden WU)', () => {
  function bare(open: boolean, idx: number, results: unknown[]): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      globalSearchOpen: signal(open),
      globalSearchActiveIndex: signal(idx),
      globalSearchResults: signal(results),
    });
    return cmp;
  }

  it('returns option id only for in-range active index while open', () => {
    expect(bare(false, 0, [{}]).globalSearchActiveDescendant()).toBeNull();
    expect(bare(true, -1, [{}]).globalSearchActiveDescendant()).toBeNull();
    expect(bare(true, 1, [{}]).globalSearchActiveDescendant()).toBeNull();
    expect(bare(true, 0, [{}, {}]).globalSearchActiveDescendant()).toBe(
      'admin-global-search-option-0',
    );
    expect(bare(true, 1, [{}, {}]).globalSearchActiveDescendant()).toBe(
      'admin-global-search-option-1',
    );
  });
});
