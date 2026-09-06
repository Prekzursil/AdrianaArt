import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-sanitize-money-input — sanitizeMoneyInput. */
describe('AdminProductsComponent sanitizeMoneyInput (golden WU)', () => {
  function bare(): AdminProductsComponent {
    return Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
  }

  it('strips junk, caps fraction digits, and flags changes', () => {
    const cmp = bare() as any;
    expect(cmp.sanitizeMoneyInput('')).toEqual({ clean: '', changed: false });
    expect(cmp.sanitizeMoneyInput('12.345')).toEqual({ clean: '12.34', changed: true });
    expect(cmp.sanitizeMoneyInput('12.3')).toEqual({ clean: '12.3', changed: false });
    expect(cmp.sanitizeMoneyInput('.$5')).toEqual({ clean: '0.5', changed: true });
    expect(cmp.sanitizeMoneyInput('1a2')).toEqual({ clean: '12', changed: true });
  });
});
