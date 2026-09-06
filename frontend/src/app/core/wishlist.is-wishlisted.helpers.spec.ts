import { WishlistService } from './wishlist.service';

/** Golden WU is-wishlisted — isWishlisted. */
describe('WishlistService isWishlisted (golden WU)', () => {
  it('checks membership via ids()', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    Object.assign(svc as any, {
      ids: () => new Set(['p1']),
    });
    expect(svc.isWishlisted('p1')).toBe(true);
    expect(svc.isWishlisted('p2')).toBe(false);
  });
});
