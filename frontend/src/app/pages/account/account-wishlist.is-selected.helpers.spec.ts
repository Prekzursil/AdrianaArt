import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-is-selected — isSelected. */
describe('AccountWishlistComponent isSelected (golden WU)', () => {
  it('checks membership in selected set', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).selected = new Set(['a']);
    expect(cmp.isSelected('a')).toBe(true);
    expect(cmp.isSelected('b')).toBe(false);
  });
});
