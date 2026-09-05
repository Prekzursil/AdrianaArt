import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AccountService } from '../../core/account.service';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { CartApi } from '../../core/cart.api';
import { CartStore } from '../../core/cart.store';
import { CheckoutPrefsService } from '../../core/checkout-prefs.service';
import type { CouponOffer } from '../../core/coupons.service';
import { CheckoutComponent } from './checkout.component';

/**
 * Golden WU chk56 — N=3 NEW uncovered checkout helper arms:
 * payment availability, coupon describe/shortfall, courier delivery estimates.
 * PR #752 (chk55) covers step gates / country normalize / shipping guards separately.
 */
describe('Checkout coupon/payment arms (golden WU chk56)', () => {
  const itemsSignal = signal([
    {
      id: 'line1',
      product_id: 'p1',
      variant_id: null,
      name: 'Prod',
      slug: 'prod',
      price: 50,
      currency: 'RON',
      quantity: 1,
      stock: 5,
      image: '/img.png',
    },
  ]);
  const subtotalSignal = signal(50);

  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated', 'user']);
    auth.isAuthenticated.and.returnValue(true);
    auth.user.and.returnValue({ email_verified: true } as any);

    const emptyQueryParamMap = convertToParamMap({});

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CheckoutComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: CartStore,
          useValue: {
            items: itemsSignal,
            subtotal: subtotalSignal,
            clear: jasmine.createSpy('clear'),
            hydrateFromBackend: jasmine.createSpy('hydrateFromBackend'),
          },
        },
        {
          provide: CartApi,
          useValue: {
            sync: jasmine.createSpy('sync').and.returnValue(of({})),
            headers: jasmine.createSpy('headers').and.returnValue({}),
          },
        },
        {
          provide: ApiService,
          useValue: {
            post: jasmine.createSpy('post').and.returnValue(of({})),
            get: jasmine.createSpy('get').and.returnValue(of({ eligible: [], ineligible: [] })),
          },
        },
        {
          provide: AccountService,
          useValue: {
            getAddresses: jasmine.createSpy('getAddresses').and.returnValue(of([])),
          },
        },
        { provide: AuthService, useValue: auth },
        {
          provide: CheckoutPrefsService,
          useValue: {
            tryLoadDeliveryPrefs: jasmine
              .createSpy('tryLoadDeliveryPrefs')
              .and.returnValue({ courier: 'sameday', deliveryType: 'home' }),
            saveDeliveryPrefs: jasmine.createSpy('saveDeliveryPrefs'),
            tryLoadPaymentMethod: jasmine.createSpy('tryLoadPaymentMethod').and.returnValue(null),
            savePaymentMethod: jasmine.createSpy('savePaymentMethod'),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParamMap: emptyQueryParamMap, data: {} },
            queryParamMap: of(emptyQueryParamMap),
          },
        },
      ],
    });

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        account: {
          coupons: {
            freeShipping: 'Free shipping',
            amountOff: '{{value}} off',
            percentOff: '{{value}}% off',
          },
        },
        checkout: {
          couponNotEligible: 'Not eligible',
          couponReasons: {
            min_subtotal_not_met: 'Minimum subtotal not met',
          },
        },
      },
      true,
    );
    translate.setDefaultLang('en');
    void translate.use('en');
  });

  function createCmp(): CheckoutComponent {
    return TestBed.createComponent(CheckoutComponent).componentInstance;
  }

  function percentOffer(overrides: Partial<CouponOffer> = {}): CouponOffer {
    return {
      coupon: {
        id: 'c1',
        promotion_id: 'p1',
        code: 'SAVE10',
        visibility: 'public',
        is_active: true,
        promotion: {
          id: 'p1',
          name: 'Ten off',
          discount_type: 'percent',
          percentage_off: '10',
          allow_on_sale_items: true,
          is_active: true,
          is_automatic: false,
        },
      },
      estimated_discount_ron: '5.00',
      estimated_shipping_discount_ron: '0',
      eligible: true,
      reasons: [],
      ...overrides,
    };
  }

  it('payment availability: isPaymentMethodAvailable gates cod/netopia by country and stripe by flag', () => {
    const cmp = createCmp();
    cmp.currency = 'RON';
    cmp.address.country = 'RO';
    cmp.shippingCountryInput = 'RO';
    cmp.netopiaEnabled = true;
    cmp.paypalEnabled = true;
    cmp.stripeEnabled = true;

    expect(cmp.isPaymentMethodAvailable('cod')).toBeTrue();
    expect(cmp.isPaymentMethodAvailable('netopia')).toBeTrue();
    expect(cmp.isPaymentMethodAvailable('paypal')).toBeTrue();
    expect(cmp.isPaymentMethodAvailable('stripe')).toBeTrue();

    cmp.address.country = 'US';
    cmp.shippingCountryInput = 'US — United States';
    expect(cmp.isPaymentMethodAvailable('cod')).toBeFalse();
    expect(cmp.isPaymentMethodAvailable('netopia')).toBeFalse();
    expect(cmp.isPaymentMethodAvailable('paypal')).toBeTrue();

    cmp.stripeEnabled = false;
    expect(cmp.isPaymentMethodAvailable('stripe')).toBeFalse();

    cmp.netopiaEnabled = false;
    cmp.address.country = 'RO';
    cmp.shippingCountryInput = 'RO';
    expect(cmp.isPaymentMethodAvailable('netopia')).toBeFalse();
  });

  it('coupon helpers: describeCouponOffer, describeCouponReasons, minSubtotalShortfall', () => {
    const cmp = createCmp();
    (cmp as any).quote = {
      subtotal: 40,
      fee: 0,
      tax: 0,
      shipping: 0,
      total: 40,
      currency: 'RON',
    };

    const described = cmp.describeCouponOffer(percentOffer());
    expect(described).toContain('SAVE10');
    expect(described).toContain('10% off');
    expect(described).toContain('≈5.00 RON');

    expect(cmp.describeCouponReasons([])).toBe('Not eligible');
    expect(cmp.describeCouponReasons(['min_subtotal_not_met'])).toBe('Minimum subtotal not met');
    expect(cmp.describeCouponReasons(['unknown_reason'])).toBe('unknown_reason');

    const shortfall = cmp.minSubtotalShortfall(
      percentOffer({
        eligible: false,
        reasons: ['min_subtotal_not_met'],
        coupon: {
          ...percentOffer().coupon,
          promotion: {
            ...percentOffer().coupon.promotion!,
            min_subtotal: '100',
          },
        },
      }),
    );
    expect(shortfall).toEqual({ min: 100, remaining: 60, progress: 0.4 });
    expect(cmp.minSubtotalShortfall(percentOffer())).toBeNull();
  });

  it('courier estimate: courierEstimateKey and courierEstimateParams for home vs locker', () => {
    const cmp = createCmp();
    cmp.deliveryType = 'home';

    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateRange');
    expect(cmp.courierEstimateParams('sameday')).toEqual({ min: 1, max: 2 });

    expect(cmp.courierEstimateKey('fan_courier')).toBe('checkout.deliveryEstimateRange');
    expect(cmp.courierEstimateParams('fan_courier')).toEqual({ min: 1, max: 3 });

    cmp.deliveryType = 'locker';
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateRange');
    expect(cmp.courierEstimateParams('sameday')).toEqual({ min: 1, max: 3 });
    expect(cmp.courierEstimateParams('fan_courier')).toEqual({ min: 2, max: 4 });
  });
});
