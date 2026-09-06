import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-ng-on-destroy -- ngOnDestroy. */
describe('AccountProfileComponent ngOnDestroy (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).ngOnDestroy()).not.toThrow();
  });
});
