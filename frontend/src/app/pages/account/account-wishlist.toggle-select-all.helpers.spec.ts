import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-toggle-select-all — toggleSelectAll. */
describe('AccountWishlistComponent toggleSelectAll (golden WU)', () => {
  function bare(items: Array<{ id: string }>): AccountWishlistComponent {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(),
      account: { wishlist: { items: () => items } },
    });
    return cmp;
  }

  it('selects all ids when checked and clears when unchecked', () => {
    const cmp = bare([{ id: 'a' }, { id: 'b' }]);
    cmp.toggleSelectAll(true);
    expect(Array.from((cmp as any).selected).sort()).toEqual(['a', 'b']);
    cmp.toggleSelectAll(false);
    expect((cmp as any).selected.size).toBe(0);
  });
});
