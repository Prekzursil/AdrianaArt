import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-remove-selected -- removeSelected. */
describe('AccountWishlistComponent removeSelected (golden WU)', () => {
  it('returns early when selection is empty', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set(),
      bulkBusy: false,
      translate: { instant: jasmine.createSpy('instant') },
    });
    cmp.removeSelected();
    expect((cmp as any).bulkBusy).toBe(false);
    expect((cmp as any).translate.instant).not.toHaveBeenCalled();
  });
});
