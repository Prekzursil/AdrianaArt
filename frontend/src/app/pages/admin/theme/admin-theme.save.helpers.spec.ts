import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-save -- save. */
describe('AdminThemeComponent save (golden WU)', () => {
  it('returns early when busy', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      busy: Object.assign(jasmine.createSpy('busy').and.returnValue(true), {
        set: jasmine.createSpy('set'),
      }),
      service: { saveDraft: jasmine.createSpy('saveDraft') },
    });
    cmp.save();
    expect((cmp as any).busy.set).not.toHaveBeenCalled();
    expect((cmp as any).service.saveDraft).not.toHaveBeenCalled();
  });
});
