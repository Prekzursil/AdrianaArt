import { WishlistService } from './wishlist.service';

/** Golden WU wishlist-effective-price — effectivePrice. */
describe('WishlistService effectivePrice (golden WU)', () => {
  it('prefers a finite sale_price below base_price', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    expect(svc.effectivePrice({ base_price: 20, sale_price: 12 } as any)).toBe(12);
    expect(svc.effectivePrice({ base_price: 20, sale_price: 20 } as any)).toBe(20);
    expect(svc.effectivePrice({ base_price: 20, sale_price: null } as any)).toBe(20);
    expect(svc.effectivePrice({ base_price: 20, sale_price: Number.NaN } as any)).toBe(20);
  });
});
