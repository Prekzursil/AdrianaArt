import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-check-stale -- checkStale. */
describe('AdminThemeComponent checkStale (golden WU)', () => {
  it('no-ops when not loaded', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      loaded: jasmine.createSpy('loaded').and.returnValue(false),
      service: { getDraft: jasmine.createSpy('getDraft') },
    });
    (cmp as any).checkStale();
    expect((cmp as any).service.getDraft).not.toHaveBeenCalled();
  });

  it('marks stale when draft version diverges', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      loaded: jasmine.createSpy('loaded').and.returnValue(true),
      baselineVersion: 3,
      staleView: { set: jasmine.createSpy('staleViewSet') },
      service: {
        getDraft: jasmine.createSpy('getDraft').and.returnValue({
          subscribe: (h: any) => h.next({ version: 4, tokens: {} }),
        }),
      },
    });
    (cmp as any).checkStale();
    expect((cmp as any).staleView.set).toHaveBeenCalledWith(true);
  });
});
