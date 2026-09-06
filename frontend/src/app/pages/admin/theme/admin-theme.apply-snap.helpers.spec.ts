import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-apply-snap -- applySnap. */
describe('AdminThemeComponent applySnap (golden WU)', () => {
  it('applies candidate token value', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      applyEdit: jasmine.createSpy('applyEdit'),
    });
    (cmp as any).applySnap({ token: '--accent', value: '10 20 30' });
    expect((cmp as any).applyEdit).toHaveBeenCalledWith('--accent', '10 20 30');
  });
});
