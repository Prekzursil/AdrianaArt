import { WishlistService } from './wishlist.service';

/** Golden WU wishlist-clear — clear. */
describe('WishlistService clear (golden WU)', () => {
  it('resets items/loaded/loading signals', () => {
    const svc = Object.create(WishlistService.prototype) as WishlistService;
    const state = { items: [1], loaded: true, loading: true } as any;
    Object.assign(svc as any, {
      itemsSignal: { set: (v: any) => (state.items = v) },
      loadedSignal: { set: (v: any) => (state.loaded = v) },
      loadingSignal: { set: (v: any) => (state.loading = v) },
    });
    svc.clear();
    expect(state).toEqual({ items: [], loaded: false, loading: false });
  });
});
