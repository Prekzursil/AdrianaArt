import { ShopComponent } from './shop.component';
import type { Category } from '../../core/catalog.service';

/** Golden WU — getSubcategories / onSidebarSearchChange / onSearch. */
describe('ShopComponent subcats/search helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      childrenByParentId: new Map<string, Category[]>(),
      filters: { search: '' },
      scheduleFilterApply: jasmine.createSpy('scheduleFilterApply'),
      applyFilters: jasmine.createSpy('applyFilters'),
      ...overrides,
    });
    return cmp;
  }

  it('getSubcategories returns children map or empty', () => {
    const child = { id: 'c1' } as Category;
    const cmp = bare({ childrenByParentId: new Map([['p1', [child]]]) });
    expect(cmp.getSubcategories({ id: 'p1' } as Category)).toEqual([child]);
    expect(cmp.getSubcategories({ id: 'missing' } as Category)).toEqual([]);
  });

  it('onSidebarSearchChange writes search and schedules apply', () => {
    const cmp = bare();
    cmp.onSidebarSearchChange(42);
    expect((cmp as any).filters.search).toBe('42');
    expect((cmp as any).scheduleFilterApply).toHaveBeenCalled();
    cmp.onSidebarSearchChange(null as any);
    expect((cmp as any).filters.search).toBe('');
  });

  it('onSearch applies filters immediately', () => {
    const cmp = bare();
    cmp.onSearch();
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
