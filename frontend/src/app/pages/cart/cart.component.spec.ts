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

describe('CartComponent quote / stock helpers', () => {
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
    itemsSig.set([]);
    subtotalSig.set(42);
    quoteSig.set({
      subtotal: 0,
      fee: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'RON',
      freeShippingThresholdRon: null,
    });
    syncingSig.set(false);
    cartStub.loadFromBackend.calls.reset();
    cartStub.updateQuantity.calls.reset();

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

  it('quoteSubtotal and quoteTotal fall back to cart.subtotal when quote amounts are non-positive', () => {
    const cmp = createCmp();
    quoteSig.set({
      subtotal: 0,
      fee: 1,
      tax: 1,
      shipping: 1,
      total: 0,
      currency: 'RON',
      freeShippingThresholdRon: null,
    });
    subtotalSig.set(55);
    expect(cmp.quoteSubtotal()).toBe(55);
    expect(cmp.quoteTotal()).toBe(55);

    quoteSig.set({
      subtotal: 80,
      fee: 2,
      tax: 3,
      shipping: 5,
      total: 90,
      currency: 'RON',
      freeShippingThresholdRon: null,
    });
    expect(cmp.quoteSubtotal()).toBe(80);
    expect(cmp.quoteTotal()).toBe(90);
  });

  it('freeShippingProgressPct clamps and freeShippingRemaining uses taxable subtotal', () => {
    const cmp = createCmp();
    quoteSig.set({
      subtotal: 40,
      fee: 0,
      tax: 0,
      shipping: 0,
      total: 40,
      currency: 'RON',
      freeShippingThresholdRon: 100,
    });
    expect(cmp.freeShippingRemaining()).toBe(60);
    expect(cmp.freeShippingProgressPct()).toBe(40);

    quoteSig.set({
      subtotal: 250,
      fee: 0,
      tax: 0,
      shipping: 0,
      total: 250,
      currency: 'RON',
      freeShippingThresholdRon: 100,
    });
    expect(cmp.freeShippingRemaining()).toBe(0);
    expect(cmp.freeShippingProgressPct()).toBe(100);

    quoteSig.set({
      subtotal: 10,
      fee: 0,
      tax: 0,
      shipping: 0,
      total: 10,
      currency: 'RON',
      freeShippingThresholdRon: null,
    });
    expect(cmp.freeShippingRemaining()).toBeNull();
    expect(cmp.freeShippingProgressPct()).toBe(0);
  });

  it('isLowStock / isMaxQuantity and stepQuantity clamp against stock', () => {
    const cmp = createCmp();
    const low: CartItem = {
      id: 'i1',
      product_id: 'p1',
      name: 'Mug',
      slug: 'mug',
      price: 10,
      currency: 'RON',
      quantity: 2,
      stock: 3,
    };
    const maxed: CartItem = { ...low, id: 'i2', quantity: 3, stock: 3 };
    const unlimited: CartItem = { ...low, id: 'i3', quantity: 9, stock: 0 };

    expect(cmp.isLowStock(low)).toBeTrue();
    expect(cmp.isMaxQuantity(low)).toBeFalse();
    expect(cmp.isMaxQuantity(maxed)).toBeTrue();
    expect(cmp.isLowStock(unlimited)).toBeFalse();
    expect(cmp.isMaxQuantity(unlimited)).toBeFalse();

    itemsSig.set([low]);
    cmp.stepQuantity(low, 5);
    expect(cartStub.updateQuantity).toHaveBeenCalledWith('i1', 3);
  });
});
