import { AdminComponent } from './admin.component';

/** Golden WU admin-category-parent-options — categoryParentOptions. */
describe('AdminComponent categoryParentOptions (golden WU)', () => {
  function createCmp(
    categories: Array<{ id: string; name: string; parent_id?: string | null }>,
  ) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categories = categories;
    return cmp;
  }

  it('excludes self/descendants and sorts by name', () => {
    const cats = [
      { id: 'root', name: 'Root', parent_id: null },
      { id: 'child', name: 'Child', parent_id: 'root' },
      { id: 'other', name: 'Other', parent_id: null },
      { id: 'alpha', name: 'Alpha', parent_id: null },
    ];
    const cmp = createCmp(cats);
    expect(cmp.categoryParentOptions({ id: 'root', name: 'Root' } as never).map((c) => c.id)).toEqual([
      'alpha',
      'other',
    ]);
    expect(cmp.categoryParentOptions({ id: 'other', name: 'Other' } as never).map((c) => c.id)).toEqual([
      'alpha',
      'child',
      'root',
    ]);
  });
});
