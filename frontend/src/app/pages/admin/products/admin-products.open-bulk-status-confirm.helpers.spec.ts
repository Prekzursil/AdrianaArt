import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-open-bulk-status-confirm -- openBulkStatusConfirm. */
describe('AdminProductsComponent openBulkStatusConfirm (golden WU)', () => {
  it('returns early on guard', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('selectedUser').and.returnValue(null),
      selectedCoupon: jasmine.createSpy('selectedCoupon').and.returnValue(null),
      editingSlug: jasmine.createSpy('editingSlug').and.returnValue(null),
      editingProductId: jasmine.createSpy('editingProductId').and.returnValue(null),
      categoryManagerSelectedCategory: jasmine.createSpy('cat').and.returnValue(null),
      statusConfirmTarget: jasmine.createSpy('t').and.returnValue(null),
      deleteImageConfirmTarget: jasmine.createSpy('dit').and.returnValue(null),
      deleteImageConfirmBusy: jasmine.createSpy('dib').and.returnValue(false),
      statusConfirmBusy: jasmine.createSpy('scb').and.returnValue(false),
      deleteSaving: jasmine.createSpy('ds').and.returnValue(false),
      deletePreview: jasmine.createSpy('dp').and.returnValue(null),
      wizardSteps: jasmine.createSpy('ws').and.returnValue([]),
      wizardStep: { set: jasmine.createSpy('wss') },
      wizardKind: jasmine.createSpy('wk').and.returnValue('create'),
      relationshipsRelatedIds: jasmine.createSpy('rr').and.returnValue([]),
      relationshipsUpsellIds: jasmine.createSpy('ru').and.returnValue([]),
      categories: jasmine.createSpy('cats').and.returnValue([]),
      categoryManagerSlug: '',
      promotionForm: { included_product_ids: [], excluded_product_ids: [] },
      productCache: {},
      bulkEmails: [],
      bulkBusy: { set: jasmine.createSpy('bb') },
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      adminCoupons: { assignCoupon: jasmine.createSpy('a'), bulkAssignCoupon: jasmine.createSpy('b') },
      admin: { revokeSessions: jasmine.createSpy('r'), deleteProductTranslation: jasmine.createSpy('d') },
      usersApi: { impersonate: jasmine.createSpy('i') },
      impersonateBusy: { set: jasmine.createSpy('ib') },
      roleChangeBusy: { set: jasmine.createSpy('rb') },
      couponIssuedCode: jasmine.createSpy('cic').and.returnValue(null),
      translationError: { set: jasmine.createSpy('te') },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      t: (k: string) => k,
    });
    expect(() => (cmp as any).openBulkStatusConfirm()).not.toThrow();
  });
});
