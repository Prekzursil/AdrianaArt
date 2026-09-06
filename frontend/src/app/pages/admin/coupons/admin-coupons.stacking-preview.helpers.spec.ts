import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU — stackingMinSubtotalBlocked + stackingPreviewProductDiscount. */
describe('AdminCouponsComponent stacking preview helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      promotionForm: {
        min_subtotal: '',
        discount_type: 'percent',
        percentage_off: '10',
        amount_off: '',
        allow_on_sale_items: true,
      },
      stackingSampleSubtotal: '100',
      ...overrides,
    });
    return cmp;
  }

  it('stackingMinSubtotalBlocked compares sample subtotal to min', () => {
    expect(bare().stackingMinSubtotalBlocked()).toBe(false);
    expect(
      bare({
        promotionForm: {
          min_subtotal: '150',
          discount_type: 'percent',
          percentage_off: '10',
          amount_off: '',
          allow_on_sale_items: true,
        },
      }).stackingMinSubtotalBlocked(),
    ).toBe(true);
    expect(
      bare({
        promotionForm: {
          min_subtotal: '0',
          discount_type: 'percent',
          percentage_off: '10',
          amount_off: '',
          allow_on_sale_items: true,
        },
      }).stackingMinSubtotalBlocked(),
    ).toBe(false);
  });

  it('stackingPreviewProductDiscount handles free_shipping / percent / amount / sale gate', () => {
    expect(
      bare({
        promotionForm: {
          min_subtotal: '',
          discount_type: 'free_shipping',
          percentage_off: '',
          amount_off: '',
          allow_on_sale_items: true,
        },
      }).stackingPreviewProductDiscount(false),
    ).toBeNull();

    expect(bare().stackingPreviewProductDiscount(false)).toBe(10);

    expect(
      bare({
        promotionForm: {
          min_subtotal: '',
          discount_type: 'amount',
          percentage_off: '',
          amount_off: '25',
          allow_on_sale_items: true,
        },
      }).stackingPreviewProductDiscount(false),
    ).toBe(25);

    expect(
      bare({
        promotionForm: {
          min_subtotal: '',
          discount_type: 'percent',
          percentage_off: '10',
          amount_off: '',
          allow_on_sale_items: false,
        },
      }).stackingPreviewProductDiscount(true),
    ).toBe(0);

    expect(
      bare({
        promotionForm: {
          min_subtotal: '200',
          discount_type: 'percent',
          percentage_off: '10',
          amount_off: '',
          allow_on_sale_items: true,
        },
      }).stackingPreviewProductDiscount(false),
    ).toBe(0);
  });
});
