import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — variantComputedPrice sums base + delta. */
describe('AdminProductsComponent variantComputedPrice (golden WU)', () => {
  function bare(): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).form = { base_price: '10.00' };
    (cmp as any).parseMoneyInput = (raw: string) => {
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    };
    (cmp as any).parseSignedMoneyInput = (raw: string) => {
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    };
    return cmp;
  }

  it('adds delta to base and rounds to cents', () => {
    const cmp = bare();
    expect(cmp.variantComputedPrice('2.555')).toBe(12.56);
    expect(cmp.variantComputedPrice('')).toBe(10);
    (cmp as any).form = { base_price: '' };
    expect(cmp.variantComputedPrice('3')).toBe(3);
  });
});
