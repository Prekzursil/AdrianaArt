import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-on-panic-reset -- onPanicReset. */
describe('AdminThemeComponent onPanicReset (golden WU)', () => {
  it('delegates to reload', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, { reload: jasmine.createSpy('reload') });
    cmp.onPanicReset();
    expect((cmp as any).reload).toHaveBeenCalled();
  });
});
