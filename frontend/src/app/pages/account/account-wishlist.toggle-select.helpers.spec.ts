import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-toggle-select-helpers. */
describe('AccountWishlistComponent toggle select helpers (golden WU)', () => {
  function bare(): AccountWishlistComponent {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(),
      account: { wishlist: { items: () => [{ id: 'p1' }, { id: 'p2' }] } },
    });
    return cmp;
  }

  it('toggleSelected / isSelected / toggleSelectAll', () => {
    const cmp = bare();
    cmp.toggleSelected('p1', true);
    expect(cmp.isSelected('p1')).toBe(true);
    cmp.toggleSelected('p1', false);
    expect(cmp.isSelected('p1')).toBe(false);
    cmp.toggleSelectAll(true);
    expect(cmp.isSelected('p1')).toBe(true);
    expect(cmp.isSelected('p2')).toBe(true);
    cmp.toggleSelectAll(false);
    expect((cmp as any).selected.size).toBe(0);
  });
});
