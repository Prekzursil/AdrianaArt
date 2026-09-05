import { ShopComponent } from './shop.component';

/** Golden WU shop-toggle-tag — toggleTag add/remove ordering (#726 sidecar). */
describe('ShopComponent toggleTag helpers (golden WU)', () => {
  function createCmp(initial: string[] = []): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).filters = { tags: new Set(initial), page: 3 };
    (cmp as any).filterDebounce = setTimeout(() => undefined, 99999);
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    return cmp;
  }

  it('adds a missing tag, resets page, cancels debounce, and reloads', () => {
    const cmp = createCmp([]);
    cmp.toggleTag('new');
    expect((cmp as any).filters.tags.has('new')).toBe(true);
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).filterDebounce).toBeUndefined();
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('removes an existing tag and reloads', () => {
    const cmp = createCmp(['keep', 'drop']);
    cmp.toggleTag('drop');
    expect(Array.from((cmp as any).filters.tags)).toEqual(['keep']);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('toggling the same tag twice restores membership', () => {
    const cmp = createCmp([]);
    cmp.toggleTag('flip');
    cmp.toggleTag('flip');
    expect((cmp as any).filters.tags.has('flip')).toBe(false);
    expect((cmp as any).loadProducts).toHaveBeenCalledTimes(2);
  });
});
