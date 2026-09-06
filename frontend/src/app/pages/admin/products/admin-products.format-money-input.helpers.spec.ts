import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-format-money-input — formatMoneyInput. */
describe('AdminProductsComponent formatMoneyInput (golden WU)', () => {
  it('formats finite numbers to 2dp', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).formatMoneyInput as (
      this: AdminProductsComponent,
      value: number,
    ) => string;
    expect(fn.call(cmp, Number.NaN)).toBe('');
    expect(fn.call(cmp, 12)).toBe('12.00');
    expect(fn.call(cmp, 12.345)).toBe('12.35');
  });
});
