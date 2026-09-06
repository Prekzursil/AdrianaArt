import { WishlistService } from './wishlist.service';

/** Golden WU wishlist-snapshot-storage-key — snapshotStorageKey. */
describe('WishlistService snapshotStorageKey (golden WU)', () => {
  it('namespaces user id under wishlist_snapshot', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    expect((svc as any).snapshotStorageKey('u-1')).toBe('wishlist_snapshot:u-1');
  });
});
