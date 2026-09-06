import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-on-triplet -- onTriplet. */
describe('AdminThemeComponent onTriplet (golden WU)', () => {
  it('forwards input value to applyEdit', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, { applyEdit: jasmine.createSpy('applyEdit') });
    cmp.onTriplet('primary', { target: { value: '#112233' } } as any);
    expect((cmp as any).applyEdit).toHaveBeenCalledWith('primary', '#112233');
  });
});
