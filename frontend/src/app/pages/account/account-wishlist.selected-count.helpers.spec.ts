import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-selected-count — selectedCount. */
describe('AccountWishlistComponent selectedCount (golden WU)', () => {
  it('returns selected set size', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, { selected: new Set(['a', 'b']) });
    expect(cmp.selectedCount()).toBe(2);
    (cmp as any).selected = new Set();
    expect(cmp.selectedCount()).toBe(0);
  });
});
