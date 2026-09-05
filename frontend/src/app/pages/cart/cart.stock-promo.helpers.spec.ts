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
import { CatalogService } from '../../core/catalog.service';
import { CheckoutPrefsService } from '../../core/checkout-prefs.service';
import { AnalyticsService } from '../../core/analytics.service';

describe('CartComponent stock / promo helpers (golden WU)', () => {
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

  function item(overrides: Partial<CartItem> = {}): CartItem {
    return {
      id: 'i1',
      product_id: 'p1',
      name: 'Item',
      slug: 'item',
      price: 10,
      currency: 'RON',
      quantity: 1,
      stock: 5,
      ...overrides,
    };
  }

  it('isLowStock is true only for positive stock at or below 3', () => {
    const cmp = createCmp();
    expect(cmp.isLowStock(item({ stock: 0 }))).toBe(false);
    expect(cmp.isLowStock(item({ stock: 1 }))).toBe(true);
    expect(cmp.isLowStock(item({ stock: 3 }))).toBe(true);
    expect(cmp.isLowStock(item({ stock: 4 }))).toBe(false);
  });

  it('isMaxQuantity is true when quantity meets positive stock', () => {
    const cmp = createCmp();
    expect(cmp.isMaxQuantity(item({ stock: 0, quantity: 9 }))).toBe(false);
    expect(cmp.isMaxQuantity(item({ stock: 2, quantity: 1 }))).toBe(false);
    expect(cmp.isMaxQuantity(item({ stock: 2, quantity: 2 }))).toBe(true);
    expect(cmp.isMaxQuantity(item({ stock: 2, quantity: 3 }))).toBe(true);
  });

  it('quotePromoSavings adds quote discount and matching coupon shipping discount', () => {
    const cmp = createCmp();
    quoteSig.set({
      subtotal: 100,
      fee: 0,
      tax: 0,
      shipping: 20,
      total: 110,
      currency: 'RON',
      freeShippingThresholdRon: null,
    });
    // discount = 100+0+0+20-110 = 10
    cmp.promo = '';
    cmp.appliedCouponOffer = null;
    expect(cmp.quotePromoSavings()).toBe(10);

    cmp.promo = 'SAVE';
    cmp.appliedCouponOffer = {
      eligible: true,
      coupon: { code: 'SAVE' } as any,
      estimated_discount_ron: '0',
      estimated_shipping_discount_ron: '5.00',
      reasons: [],
    };
    expect(cmp.quotePromoSavings()).toBe(15);

    // mismatched code ignores shipping discount arm
    cmp.promo = 'OTHER';
    expect(cmp.quotePromoSavings()).toBe(10);

    // ineligible offer ignored
    cmp.promo = 'SAVE';
    cmp.appliedCouponOffer = {
      eligible: false,
      coupon: { code: 'SAVE' } as any,
      estimated_discount_ron: '0',
      estimated_shipping_discount_ron: '5.00',
      reasons: [],
    };
    expect(cmp.quotePromoSavings()).toBe(10);
  });
});
