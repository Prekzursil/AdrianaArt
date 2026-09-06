import { AccountCouponsComponent } from './account-coupons.component';

/** Golden WU account-coupons-ng-on-init -- ngOnInit. */
describe('AccountCouponsComponent ngOnInit (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AccountCouponsComponent.prototype) as AccountCouponsComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).ngOnInit()).not.toThrow();
  });
});
