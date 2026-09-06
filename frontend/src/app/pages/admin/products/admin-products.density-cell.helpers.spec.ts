import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-density-cell-helpers. */
describe('AdminProductsComponent density/cell helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      tableLayout: () => ({ density: 'comfortable' }),
      ...overrides,
    });
    return cmp;
  }

  it('densityToggleLabelKey flips compact/comfortable keys', () => {
    expect(bare().densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toCompact');
    expect(
      bare({ tableLayout: () => ({ density: 'compact' }) }).densityToggleLabelKey(),
    ).toBe('adminUi.tableLayout.densityToggle.toComfortable');
  });

  it('cellPaddingClass follows density; trackColumnId returns id', () => {
    const comfortable = bare().cellPaddingClass();
    const compact = bare({ tableLayout: () => ({ density: 'compact' }) }).cellPaddingClass();
    expect(typeof comfortable).toBe('string');
    expect(typeof compact).toBe('string');
    expect(comfortable).not.toBe(compact);
    expect(bare().trackColumnId(0, 'sku')).toBe('sku');
  });
});
