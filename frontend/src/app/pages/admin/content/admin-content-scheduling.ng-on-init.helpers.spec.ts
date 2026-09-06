import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU admin-content-scheduling-ng-on-init -- ngOnInit. */
describe('AdminContentSchedulingComponent ngOnInit (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s'), info: jasmine.createSpy('i') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      notifications: jasmine.createSpy('notifications').and.returnValue([]),
      density: jasmine.createSpy('density').and.returnValue('comfortable'),
      columns: jasmine.createSpy('columns').and.returnValue([]),
      views: jasmine.createSpy('views').and.returnValue([]),
      currentView: jasmine.createSpy('currentView').and.returnValue(null),
      promotions: jasmine.createSpy('promotions').and.returnValue([]),
      selectedPromotion: jasmine.createSpy('selectedPromotion').and.returnValue(null),
      wishlist: jasmine.createSpy('wishlist').and.returnValue([]),
      backInStockStatus: jasmine.createSpy('backInStockStatus').and.returnValue({}),
      assets: jasmine.createSpy('assets').and.returnValue([]),
      selectedJobs: jasmine.createSpy('selectedJobs').and.returnValue([]),
      page: jasmine.createSpy('page').and.returnValue(1),
      posts: jasmine.createSpy('posts').and.returnValue([]),
      tokenMap: jasmine.createSpy('tokenMap').and.returnValue({}),
      schedule: jasmine.createSpy('schedule').and.returnValue([]),
      selectedVersion: jasmine.createSpy('selectedVersion').and.returnValue(null),
      order: jasmine.createSpy('order').and.returnValue(null),
      returnCreateOpen: jasmine.createSpy('returnCreateOpen').and.returnValue(false),
    });
    expect(() => (cmp as any).ngOnInit()).not.toThrow();
  });
});
