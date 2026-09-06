import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-place-order -- placeOrder. */
describe('CheckoutComponent placeOrder (golden WU)', () => {
  it('returns early on guard', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      form: {},
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      notifications: jasmine.createSpy('notifications').and.returnValue([]),
      filter: jasmine.createSpy('filter').and.returnValue('all'),
      page: jasmine.createSpy('page').and.returnValue(1),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      theme: { setPreference: jasmine.createSpy('sp') },
      documentClick: jasmine.createSpy('dc'),
      router: { navigate: jasmine.createSpy('nav') },
      route: { snapshot: { queryParams: {} } },
      cart: { items: jasmine.createSpy('ci').and.returnValue([]) },
      products: jasmine.createSpy('products').and.returnValue([]),
      categories: jasmine.createSpy('categories').and.returnValue([]),
    });
    expect(() => (cmp as any).placeOrder({} as any)).not.toThrow();
  });
});
