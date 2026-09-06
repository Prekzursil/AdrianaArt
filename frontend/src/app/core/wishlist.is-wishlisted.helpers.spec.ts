import { WishlistService } from './wishlist.service';

/** Golden WU wishlist-is-wishlisted — isWishlisted. */
describe('WishlistService isWishlisted (golden WU)', () => {
  it('checks membership via the ids set', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    Object.assign(svc as any, { ids: () => new Set(['p1', 'p2']) });
    expect(svc.isWishlisted('p1')).toBe(true);
    expect(svc.isWishlisted('missing')).toBe(false);
  });
});
