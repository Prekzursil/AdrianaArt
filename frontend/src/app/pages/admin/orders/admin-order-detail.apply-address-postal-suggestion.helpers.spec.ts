import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-apply-address-postal-suggestion — applyAddressPostalSuggestion. */
describe('AdminOrderDetailComponent applyAddressPostalSuggestion (golden WU)', () => {
  it('trims and writes the suggestion into addressPostalCode', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).addressPostalCode = '';
    cmp.applyAddressPostalSuggestion(' 012345 ');
    expect((cmp as any).addressPostalCode).toBe('012345');
  });
});
