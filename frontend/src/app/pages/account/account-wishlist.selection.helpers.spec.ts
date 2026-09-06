import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-selection — selection helpers. */
describe('AccountWishlistComponent selection helpers (golden WU)', () => {
  function createCmp(selected: string[], items: Array<{ id: string }>) {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).selected = new Set(selected);
    (cmp as any).account = { wishlist: { items: () => items } };
    return cmp;
  }

  it('isSelected / selectedCount reflect the selected set', () => {
    const cmp = createCmp(['a', 'b'], [{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
    expect(cmp.isSelected('a')).toBe(true);
    expect(cmp.isSelected('c')).toBe(false);
    expect(cmp.selectedCount()).toBe(2);
  });

  it('allSelected requires non-empty wishlist with every id selected', () => {
    expect(createCmp([], []).allSelected()).toBe(false);
    expect(createCmp(['a'], [{ id: 'a' }, { id: 'b' }]).allSelected()).toBe(false);
    expect(createCmp(['a', 'b'], [{ id: 'a' }, { id: 'b' }]).allSelected()).toBe(true);
  });
});
