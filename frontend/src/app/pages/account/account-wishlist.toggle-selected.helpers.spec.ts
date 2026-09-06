import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-toggle-selected -- toggleSelected. */
describe('AccountWishlistComponent toggleSelected (golden WU)', () => {
  it('adds and removes product ids from selection', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, { selected: new Set<string>() });
    cmp.toggleSelected('p1', true);
    expect((cmp as any).selected.has('p1')).toBe(true);
    cmp.toggleSelected('p1', false);
    expect((cmp as any).selected.has('p1')).toBe(false);
  });
});
