import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-status-pill-class — statusPillClass. */
describe('AdminProductsComponent statusPillClass (golden WU)', () => {
  it('maps published/archived/default tones', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.statusPillClass('published')).toContain('emerald');
    expect(cmp.statusPillClass('archived')).toContain('slate');
    expect(cmp.statusPillClass('draft')).toContain('amber');
  });
});
