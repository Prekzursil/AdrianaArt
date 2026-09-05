import { ShopComponent } from './shop.component';

/** Golden WU shop-sidebar-search — onSidebarSearchChange (#724 sidecar). */
describe('ShopComponent onSidebarSearchChange helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).filters = { search: 'old' };
    (cmp as any).scheduleFilterApply = jasmine.createSpy('scheduleFilterApply');
    return cmp;
  }

  it('copies string search and schedules apply', () => {
    const cmp = createCmp();
    cmp.onSidebarSearchChange('ceramic');
    expect((cmp as any).filters.search).toBe('ceramic');
    expect((cmp as any).scheduleFilterApply).toHaveBeenCalled();
  });

  it('stringifies numeric raw input', () => {
    const cmp = createCmp();
    cmp.onSidebarSearchChange(42);
    expect((cmp as any).filters.search).toBe('42');
  });

  it('maps nullish raw to empty string', () => {
    const cmp = createCmp();
    cmp.onSidebarSearchChange(null as any);
    expect((cmp as any).filters.search).toBe('');
    cmp.onSidebarSearchChange(undefined as any);
    expect((cmp as any).filters.search).toBe('');
  });
});
