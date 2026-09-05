import { CartComponent } from './cart.component';
import type { CartItem } from '../../core/cart.store';

type SavedForLaterItem = {
  product_id: string;
  variant_id?: string | null;
  quantity: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image?: string;
  saved_at: string;
};

/** Golden WU cart-save-for-later — N=3 saveKey / removeSavedForLater / saveForLater guards. */
describe('CartComponent save-for-later helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CartComponent {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).savingForLater = {};
    (cmp as any).restoringSaved = {};
    (cmp as any).savedForLater = [];
    (cmp as any).cart = { remove: jasmine.createSpy('remove') };
    (cmp as any).toast = { error: jasmine.createSpy('error') };
    (cmp as any).translate = { instant: (k: string) => k };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  function saved(overrides: Partial<SavedForLaterItem> = {}): SavedForLaterItem {
    return {
      product_id: 'p1',
      variant_id: null,
      quantity: 1,
      name: 'Print',
      slug: 'print',
      price: 10,
      currency: 'RON',
      image: '',
      saved_at: '2026-01-01T00:00:00.000Z',
      ...overrides,
    };
  }

  it('saveKey joins product_id and variant_id (empty when nullish)', () => {
    const cmp = createCmp();
    expect(cmp.saveKey({ product_id: 'p1', variant_id: 'v9' })).toBe('p1::v9');
    expect(cmp.saveKey({ product_id: 'p1', variant_id: null })).toBe('p1::');
    expect(cmp.saveKey({ product_id: 'p1', variant_id: '' })).toBe('p1::');
  });

  it('removeSavedForLater drops matching key, persists, clears restoring flag', () => {
    const cmp = createCmp({
      savedForLater: [
        saved({ product_id: 'p1', variant_id: 'v1' }),
        saved({ product_id: 'p2', variant_id: null, slug: 'other', name: 'Other' }),
      ],
      restoringSaved: { 'p1::v1': true },
    });
    spyOn(cmp as any, 'persistSavedForLater').and.stub();
    cmp.removeSavedForLater(saved({ product_id: 'p1', variant_id: 'v1' }));
    expect(cmp.savedForLater.map((s) => s.product_id)).toEqual(['p2']);
    expect((cmp as any).persistSavedForLater).toHaveBeenCalled();
    expect(cmp.restoringSaved['p1::v1']).toBeUndefined();
  });

  it('saveForLater returns early without id or when already saving; success clears flag', () => {
    const cmp = createCmp();
    cmp.saveForLater({ id: '' } as CartItem);
    expect((cmp as any).cart.remove).not.toHaveBeenCalled();

    cmp.savingForLater['i1'] = true;
    cmp.saveForLater({ id: 'i1', product_id: 'p1' } as CartItem);
    expect((cmp as any).cart.remove).not.toHaveBeenCalled();

    cmp.savingForLater = {};
    ((cmp as any).cart.remove as jasmine.Spy).and.callFake((_id: string, opts: any) => {
      opts?.onSuccess?.();
    });
    spyOn(cmp as any, 'addSavedForLater').and.stub();
    const item = { id: 'i2', product_id: 'p2', quantity: 1 } as CartItem;
    cmp.saveForLater(item);
    expect((cmp as any).cart.remove).toHaveBeenCalledWith('i2', jasmine.any(Object));
    expect((cmp as any).addSavedForLater).toHaveBeenCalledWith(item);
    expect(cmp.savingForLater['i2']).toBeUndefined();
  });
});
