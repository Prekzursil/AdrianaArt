import { ShopComponent } from './shop.component';

/** Golden WU shop-pin-product-guards — N=3 pinProductToTop early-return arms. */
describe('ShopComponent pinProductToTop guards (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).canReorderProducts = () => true;
    (cmp as any).productReorderSaving = () => false;
    (cmp as any).products = [{ id: 'p1' }, { id: 'p2' }];
    (cmp as any).reorderProducts = jasmine.createSpy('reorderProducts').and.returnValue(true);
    (cmp as any).admin = { bulkUpdateProducts: jasmine.createSpy('bulkUpdateProducts') };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('pinProductToTop no-ops when reorder is disallowed', () => {
    const cmp = createCmp({ canReorderProducts: () => false });
    cmp.pinProductToTop('p2');
    expect((cmp as any).reorderProducts).not.toHaveBeenCalled();
  });

  it('pinProductToTop no-ops while productReorderSaving', () => {
    const cmp = createCmp({ productReorderSaving: () => true });
    cmp.pinProductToTop('p2');
    expect((cmp as any).reorderProducts).not.toHaveBeenCalled();
  });

  it('pinProductToTop no-ops for empty id or already-first product', () => {
    const cmp = createCmp();
    cmp.pinProductToTop('   ');
    cmp.pinProductToTop('p1');
    expect((cmp as any).reorderProducts).not.toHaveBeenCalled();
  });
});
