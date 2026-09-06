import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU layout-clear-nav-query -- clearNavQuery. */
describe('AdminLayoutComponent clearNavQuery (golden WU)', () => {
  it('calls onNavQueryChange with empty string', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, {
      onNavQueryChange: jasmine.createSpy('onNavQueryChange'),
    });
    cmp.clearNavQuery();
    expect((cmp as any).onNavQueryChange).toHaveBeenCalledWith('');
  });
});
