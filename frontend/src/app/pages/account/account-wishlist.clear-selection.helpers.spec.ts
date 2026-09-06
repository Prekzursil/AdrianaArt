import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-clear-selection — clearSelection. */
describe('AccountWishlistComponent clearSelection (golden WU)', () => {
  it('empties the selected set', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, { selected: new Set(['a', 'b']) });
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
  });
});
