import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-all-selected — allSelected. */
describe('AccountWishlistComponent allSelected (golden WU)', () => {
  function bare(items: Array<{ id: string }>, selected: Set<string>): AccountWishlistComponent {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected,
      account: { wishlist: { items: () => items } },
    });
    return cmp;
  }

  it('requires non-empty wishlist with every id selected', () => {
    expect(bare([], new Set()).allSelected()).toBe(false);
    expect(bare([{ id: 'a' }], new Set()).allSelected()).toBe(false);
    expect(bare([{ id: 'a' }, { id: 'b' }], new Set(['a', 'b'])).allSelected()).toBe(true);
    expect(bare([{ id: 'a' }, { id: 'b' }], new Set(['a'])).allSelected()).toBe(false);
  });
});
