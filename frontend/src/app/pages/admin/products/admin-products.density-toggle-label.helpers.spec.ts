import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-density-toggle-label — densityToggleLabelKey. */
describe('AdminProductsComponent densityToggleLabelKey (golden WU)', () => {
  it('returns the opposite density label key', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).tableLayout = () => ({ density: 'compact' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toComfortable');
    (cmp as any).tableLayout = () => ({ density: 'comfortable' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toCompact');
  });
});
