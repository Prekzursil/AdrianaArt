import { WishlistService } from './wishlist.service';

/** Golden WU wishlist-is-loaded — isLoaded. */
describe('WishlistService isLoaded (golden WU)', () => {
  it('mirrors the loaded signal', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    Object.assign(svc as any, { loadedSignal: () => false });
    expect(svc.isLoaded()).toBe(false);
    Object.assign(svc as any, { loadedSignal: () => true });
    expect(svc.isLoaded()).toBe(true);
  });
});
