import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-toggle-select-all -- toggleSelectAll. */
describe('AccountWishlistComponent toggleSelectAll (golden WU)', () => {
  it('clears or selects every wishlist item id', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(['old']),
      account: { wishlist: { items: () => [{ id: 'a' }, { id: 'b' }] } },
    });
    cmp.toggleSelectAll(false);
    expect((cmp as any).selected.size).toBe(0);
    cmp.toggleSelectAll(true);
    expect(Array.from((cmp as any).selected).sort()).toEqual(['a', 'b']);
  });
});
