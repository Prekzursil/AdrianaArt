import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-publish -- publish. */
describe('AdminThemeComponent publish (golden WU)', () => {
  it('returns early when busy', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      busy: Object.assign(jasmine.createSpy('busy').and.returnValue(true), {
        set: jasmine.createSpy('set'),
      }),
      service: { publish: jasmine.createSpy('publish') },
    });
    cmp.publish();
    expect((cmp as any).busy.set).not.toHaveBeenCalled();
    expect((cmp as any).service.publish).not.toHaveBeenCalled();
  });
});
