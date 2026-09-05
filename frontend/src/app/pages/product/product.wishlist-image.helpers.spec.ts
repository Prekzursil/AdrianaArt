import { ProductComponent } from './product.component';

/** Golden WU product-wishlist-image — activeImage/setActiveImage/wishlisted/toggleWishlist gates. */
describe('ProductComponent wishlist/image helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = {
      id: 'p1',
      name: 'Mug',
      images: [{ url: 'a.jpg' }, { url: 'b.jpg' }],
    };
    (cmp as any).activeImageIndex = 0;
    (cmp as any).wishlist = {
      isWishlisted: jasmine.createSpy('isWishlisted').and.returnValue(false),
      remove: jasmine.createSpy('remove'),
      add: jasmine.createSpy('add'),
      removeLocal: jasmine.createSpy('removeLocal'),
      addLocal: jasmine.createSpy('addLocal'),
    };
    (cmp as any).auth = { isAuthenticated: () => true };
    (cmp as any).toast = {
      info: jasmine.createSpy('info'),
      success: jasmine.createSpy('success'),
    };
    (cmp as any).translate = { instant: (k: string) => k };
    (cmp as any).router = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('activeImage falls back to placeholder and uses index', () => {
    const empty = createCmp({ product: null });
    expect(empty.activeImage).toBe('assets/placeholder/product-placeholder.svg');
    const noImages = createCmp({ product: { id: 'p', images: [] } });
    expect(noImages.activeImage).toBe('assets/placeholder/product-placeholder.svg');
    const cmp = createCmp({ activeImageIndex: 1 });
    expect(cmp.activeImage).toBe('b.jpg');
  });

  it('setActiveImage updates index; wishlisted mirrors wishlist service', () => {
    const cmp = createCmp();
    cmp.setActiveImage(1);
    expect((cmp as any).activeImageIndex).toBe(1);
    expect(cmp.wishlisted).toBe(false);
    (cmp as any).wishlist.isWishlisted.and.returnValue(true);
    expect(cmp.wishlisted).toBe(true);
    expect(createCmp({ product: null }).wishlisted).toBe(false);
  });

  it('toggleWishlist no-ops without product and redirects when anonymous', () => {
    const none = createCmp({ product: null });
    none.toggleWishlist();
    expect((none as any).wishlist.add).not.toHaveBeenCalled();

    const anon = createCmp({ auth: { isAuthenticated: () => false } });
    anon.toggleWishlist();
    expect((anon as any).toast.info).toHaveBeenCalled();
    expect((anon as any).router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect((anon as any).wishlist.add).not.toHaveBeenCalled();
  });
});
