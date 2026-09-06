import { AccountOrdersComponent } from './account-orders.component';

/** Golden WU account-orders-ng-on-init -- ngOnInit. */
describe('AccountOrdersComponent ngOnInit (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AccountOrdersComponent.prototype) as AccountOrdersComponent;
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
