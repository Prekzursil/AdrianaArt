import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-on-select -- onSelect. */
describe('AdminThemeComponent onSelect (golden WU)', () => {
  it('forwards select value to applyEdit', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, { applyEdit: jasmine.createSpy('applyEdit') });
    cmp.onSelect('radius', { target: { value: 'lg' } } as any);
    expect((cmp as any).applyEdit).toHaveBeenCalledWith('radius', 'lg');
  });
});
