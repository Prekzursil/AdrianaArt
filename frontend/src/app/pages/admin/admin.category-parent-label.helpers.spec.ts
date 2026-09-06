import { AdminComponent } from './admin.component';

/** Golden WU admin-category-parent-label — categoryParentLabel. */
describe('AdminComponent categoryParentLabel (golden WU)', () => {
  function createCmp(categories: Array<{ id: string; name: string }>) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categories = categories;
    (cmp as any).t = (key: string) => (key === 'adminUi.categories.parentNone' ? 'None' : key);
    return cmp;
  }

  it('returns none label without parent, else parent name or none fallback', () => {
    const cmp = createCmp([
      { id: 'p1', name: 'Parent One' },
      { id: 'c1', name: 'Child' },
    ]);
    expect(cmp.categoryParentLabel({ parent_id: null } as never)).toBe('None');
    expect(cmp.categoryParentLabel({ parent_id: '  ' } as never)).toBe('None');
    expect(cmp.categoryParentLabel({ parent_id: 'p1' } as never)).toBe('Parent One');
    expect(cmp.categoryParentLabel({ parent_id: 'missing' } as never)).toBe('None');
  });
});
