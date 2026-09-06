import { AdminThemeComponent } from './admin-theme.component';
import { hexToTriplet } from './theme-editor-controls';

/** Golden WU admin-theme-on-color-hex -- onColorHex. */
describe('AdminThemeComponent onColorHex (golden WU)', () => {
  it('converts hex to triplet and applies edit', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      applyEdit: jasmine.createSpy('applyEdit'),
    });
    const event = { target: { value: '#112233' } } as any;
    (cmp as any).onColorHex('--accent', event);
    expect((cmp as any).applyEdit).toHaveBeenCalledWith(
      '--accent',
      hexToTriplet('#112233'),
    );
  });
});
