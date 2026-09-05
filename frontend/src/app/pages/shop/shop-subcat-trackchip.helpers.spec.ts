import { ShopComponent } from './shop.component';
import type { Category } from '../../core/catalog.service';

describe('ShopComponent subcategory/chip helpers (golden WU)', () => {
  function createCmp() {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).childrenByParentId = new Map<string, Category[]>();
    return cmp;
  }

  function category(overrides: Partial<Category> = {}): Category {
    return {
      id: 'c1',
      name: 'Root',
      slug: 'root',
      parent_id: null,
      ...overrides,
    } as Category;
  }

  it('getSubcategories returns empty list when parent has no children', () => {
    const cmp = createCmp();
    expect(cmp.getSubcategories(category({ id: 'missing' }))).toEqual([]);
  });

  it('getSubcategories returns children mapped for the parent id', () => {
    const cmp = createCmp();
    const kids = [
      category({ id: 's1', name: 'Sub A', slug: 'sub-a', parent_id: 'c1' }),
      category({ id: 's2', name: 'Sub B', slug: 'sub-b', parent_id: 'c1' }),
    ];
    (cmp as any).childrenByParentId.set('c1', kids);
    expect(cmp.getSubcategories(category({ id: 'c1' }))).toEqual(kids);
  });

  it('trackChip returns the chip id for ngFor tracking', () => {
    const cmp = createCmp();
    expect(cmp.trackChip(0, { id: 'chip-price', type: 'price', label: '10-20' } as any)).toBe(
      'chip-price',
    );
    expect(cmp.trackChip(99, { id: 'chip-tag', type: 'tag', label: 'x' } as any)).toBe('chip-tag');
  });
});
