import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';
import { CartItem, CartQuote, CartStore } from '../../core/cart.store';
import { AuthService } from '../../core/auth.service';
import { CartApi } from '../../core/cart.api';
import { CouponsService } from '../../core/coupons.service';
import { WishlistService } from '../../core/wishlist.service';
import { ToastService } from '../../core/toast.service';
import { CatalogService, Product } from '../../core/catalog.service';
import { CheckoutPrefsService } from '../../core/checkout-prefs.service';
import { AnalyticsService } from '../../core/analytics.service';

describe('CartComponent delivery / price helpers (golden WU)', () => {
  const itemsSig = signal<CartItem[]>([]);
  const quoteSig = signal<CartQuote>({
    subtotal: 0,
    fee: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    currency: 'RON',
    freeShippingThresholdRon: null,
  });
  const subtotalSig = signal(0);
  const syncingSig = signal(false);

  const cartStub = {
    items: itemsSig.asReadonly(),
    quote: quoteSig.asReadonly(),
    subtotal: subtotalSig.asReadonly(),
    syncing: syncingSig.asReadonly(),
    loadFromBackend: jasmine.createSpy('loadFromBackend'),
    updateQuantity: jasmine.createSpy('updateQuantity').and.returnValue({}),
    remove: jasmine.createSpy('remove'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent, TranslateModule.forRoot()],
      providers: [
        { provide: CartStore, useValue: cartStub },
        { provide: AuthService, useValue: { isAuthenticated: () => false } },
        { provide: CartApi, useValue: {} },
        { provide: CouponsService, useValue: {} },
        { provide: WishlistService, useValue: { ensureLoaded: () => undefined } },
        { provide: ToastService, useValue: { success: () => {}, error: () => {} } },
        { provide: CatalogService, useValue: {} },
        {
          provide: CheckoutPrefsService,
          useValue: {
            loadDeliveryPrefs: () => ({ courier: 'sameday', deliveryType: 'home' }),
            saveDeliveryPrefs: () => undefined,
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: of(convertToParamMap({})) },
        },
        { provide: AnalyticsService, useValue: { track: () => {} } },
      ],
    });
  });

  function createCmp(): CartComponent {
    return TestBed.createComponent(CartComponent).componentInstance;
  }

  it('deliveryEstimate returns courier/type windows and null for unknown courier', () => {
    const cmp = createCmp();
    cmp.courier = 'sameday';
    cmp.deliveryType = 'home';
    expect(cmp.deliveryEstimate()).toEqual({ min: 1, max: 2 });
    cmp.deliveryType = 'locker';
    expect(cmp.deliveryEstimate()).toEqual({ min: 1, max: 3 });
    cmp.courier = 'fan_courier';
    cmp.deliveryType = 'home';
    expect(cmp.deliveryEstimate()).toEqual({ min: 1, max: 3 });
    cmp.courier = 'unknown' as any;
    expect(cmp.deliveryEstimate()).toBeNull();
  });

  it('deliveryEstimateKey and deliveryEstimateParams switch single vs range copy', () => {
    const cmp = createCmp();
    cmp.courier = 'sameday';
    cmp.deliveryType = 'home';
    spyOn(cmp, 'deliveryEstimate').and.returnValue({ min: 2, max: 2 });
    expect(cmp.deliveryEstimateKey()).toBe('cart.deliveryEstimateSingle');
    expect(cmp.deliveryEstimateParams()).toEqual({ days: 2 });

    (cmp.deliveryEstimate as jasmine.Spy).and.returnValue({ min: 1, max: 3 });
    expect(cmp.deliveryEstimateKey()).toBe('cart.deliveryEstimateRange');
    expect(cmp.deliveryEstimateParams()).toEqual({ min: 1, max: 3 });

    (cmp.deliveryEstimate as jasmine.Spy).and.returnValue(null);
    expect(cmp.deliveryEstimateKey()).toBeNull();
    expect(cmp.deliveryEstimateParams()).toEqual({});
  });

  it('displayProductPrice prefers finite sale_price below base_price', () => {
    const cmp = createCmp();
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: null } as Product)).toBe(100);
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: 80 } as Product)).toBe(80);
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: 120 } as Product)).toBe(100);
    expect(cmp.displayProductPrice({ base_price: 50, sale_price: Number.NaN } as Product)).toBe(50);
  });
});
