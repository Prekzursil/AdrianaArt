import { AccountWishlistComponent } from './account-wishlist.component';
import type { Product } from '../../core/catalog.service';

/** Golden WU — wishlist priceChange / stockChange / selection. */
describe('AccountWishlistComponent price/stock/selection (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountWishlistComponent {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(),
      account: {
        wishlist: {
          items: () => [] as Product[],
          getBaseline: (_id: string) => null as any,
          effectivePrice: (item: Product) => (item as any).base_price,
        },
      },
      ...overrides,
    });
    return cmp;
  }

  const product = (over: Record<string, unknown> = {}): Product =>
    ({
      id: 'p1',
      base_price: 100,
      stock_quantity: 5,
      allow_backorder: false,
      ...over,
    }) as Product;

  it('isSelected / selectedCount / allSelected / clearSelection', () => {
    const items = [product({ id: 'a' }), product({ id: 'b' })];
    const cmp = bare({
      selected: new Set(['a']),
      account: {
        wishlist: {
          items: () => items,
          getBaseline: () => null,
          effectivePrice: (p: Product) => (p as any).base_price,
        },
      },
    });
    expect(cmp.isSelected('a')).toBe(true);
    expect(cmp.isSelected('b')).toBe(false);
    expect(cmp.selectedCount()).toBe(1);
    expect(cmp.allSelected()).toBe(false);
    (cmp as any).selected.add('b');
    expect(cmp.allSelected()).toBe(true);
    cmp.clearSelection();
    expect(cmp.selectedCount()).toBe(0);
  });

  it('priceChange returns null without baseline / tiny delta, else direction', () => {
    const item = product({ base_price: 120 });
    const cmp = bare({
      account: {
        wishlist: {
          items: () => [item],
          getBaseline: (id: string) => (id === 'p1' ? { price: 100, stock_quantity: 5 } : null),
          effectivePrice: (p: Product) => (p as any).base_price,
        },
      },
    });
    expect(cmp.priceChange(product({ id: 'missing' }))).toBeNull();
    expect(cmp.priceChange(product({ base_price: 100.005 }))).toBeNull();
    expect(cmp.priceChange(item)).toEqual({ direction: 'up', delta: 20 });
    expect(
      bare({
        account: {
          wishlist: {
            items: () => [],
            getBaseline: () => ({ price: 100, stock_quantity: 1 }),
            effectivePrice: () => 80,
          },
        },
      }).priceChange(product()),
    ).toEqual({ direction: 'down', delta: 20 });
  });

  it('stockChange reports out/back transitions', () => {
    const cmp = bare({
      account: {
        wishlist: {
          items: () => [],
          getBaseline: () => ({ price: 10, stock_quantity: 2 }),
          effectivePrice: (p: Product) => (p as any).base_price,
        },
      },
    });
    expect(cmp.stockChange(product({ stock_quantity: 0 }))).toBe('out');
    expect(
      bare({
        account: {
          wishlist: {
            items: () => [],
            getBaseline: () => ({ price: 10, stock_quantity: 0 }),
            effectivePrice: (p: Product) => (p as any).base_price,
          },
        },
      }).stockChange(product({ stock_quantity: 3 })),
    ).toBe('back');
    expect(cmp.stockChange(product({ stock_quantity: 4 }))).toBeNull();
  });
});
