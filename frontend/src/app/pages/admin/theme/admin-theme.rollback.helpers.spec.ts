import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-rollback -- rollback. */
describe('AdminThemeComponent rollback (golden WU)', () => {
  it('returns early when busy', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      busy: Object.assign(jasmine.createSpy('busy').and.returnValue(true), {
        set: jasmine.createSpy('set'),
      }),
      service: { rollback: jasmine.createSpy('rollback') },
    });
    cmp.rollback(3);
    expect((cmp as any).busy.set).not.toHaveBeenCalled();
    expect((cmp as any).service.rollback).not.toHaveBeenCalled();
  });
});
