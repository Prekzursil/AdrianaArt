import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AccountWishlistComponent } from './account-wishlist.component';
import { AccountComponent } from './account.component';
import { CartStore } from '../../core/cart.store';
import { CatalogService, Product } from '../../core/catalog.service';
import { ToastService } from '../../core/toast.service';

/** Golden WU wl-stock — N=3 isOutOfStock / isBackInStockBusy / backInStockRequest. */
describe('AccountWishlistComponent stock helpers (golden WU)', () => {
  const wishlistItems = signal<Product[]>([]);

  beforeEach(() => {
    wishlistItems.set([]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AccountWishlistComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: AccountComponent,
          useValue: {
            wishlist: {
              items: () => wishlistItems(),
              isLoaded: () => true,
              removeLocal: jasmine.createSpy('removeLocal'),
            },
          },
        },
        {
          provide: CartStore,
          useValue: { addFromProduct: jasmine.createSpy('addFromProduct') },
        },
        {
          provide: CatalogService,
          useValue: {
            getBackInStockStatus: () => of({ in_stock: false, request: null }),
            requestBackInStock: () => of(null),
            cancelBackInStock: () => of(null),
          },
        },
        {
          provide: ToastService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
            info: jasmine.createSpy('info'),
          },
        },
      ],
    });
  });

  function makeProduct(overrides: Partial<Product> = {}): Product {
    return {
      id: 'p1',
      slug: 'p1',
      name: 'P1',
      base_price: 10,
      currency: 'RON',
      stock_quantity: 0,
      allow_backorder: false,
      ...overrides,
    };
  }

  function create(): AccountWishlistComponent {
    return TestBed.createComponent(AccountWishlistComponent).componentInstance;
  }

  it('isOutOfStock is true only when stock is empty and backorder is disallowed', () => {
    const cmp = create();
    expect(cmp.isOutOfStock(makeProduct({ stock_quantity: 0, allow_backorder: false }))).toBe(true);
    expect(cmp.isOutOfStock(makeProduct({ stock_quantity: 0, allow_backorder: true }))).toBe(false);
    expect(cmp.isOutOfStock(makeProduct({ stock_quantity: 2, allow_backorder: false }))).toBe(
      false,
    );
    expect(cmp.isOutOfStock(makeProduct({ stock_quantity: null }))).toBe(true);
  });

  it('isBackInStockBusy mirrors the busy set for the product id', () => {
    const cmp = create();
    const item = makeProduct({ id: 'busy-1' });
    expect(cmp.isBackInStockBusy(item)).toBe(false);
    (cmp as any).backInStockBusy.add('busy-1');
    expect(cmp.isBackInStockBusy(item)).toBe(true);
    (cmp as any).backInStockBusy.delete('busy-1');
    expect(cmp.isBackInStockBusy(item)).toBe(false);
  });

  it('backInStockRequest returns cached request and seeds status for OOS items', () => {
    const cmp = create();
    expect(cmp.backInStockRequest(makeProduct({ id: 'in', stock_quantity: 3 }))).toBeNull();

    const oos = makeProduct({ id: 'oos', stock_quantity: 0, allow_backorder: false });
    const req = { id: 'r1' } as any;
    (cmp as any).backInStockById.set('oos', { in_stock: false, request: req });
    expect(cmp.backInStockRequest(oos)).toBe(req);

    const cold = makeProduct({ id: 'cold', stock_quantity: 0, allow_backorder: false });
    expect(cmp.backInStockRequest(cold)).toBeNull();
    expect(
      (cmp as any).backInStockBusy.has('cold') || (cmp as any).backInStockById.has('cold'),
    ).toBe(true);
  });
});
