import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-address-postal-suggestion — addressPostalSuggestion. */
describe('AdminOrderDetailComponent addressPostalSuggestion (golden WU)', () => {
  it('returns postalState suggestion when present', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).addressCountry = 'RO';
    (cmp as any).addressPostalCode = '01 2345';
    (cmp as any).normalizeCountry = (c: string) => c;
    (cmp as any).postalState = () => ({ state: 'warn', suggestion: '012345' });
    expect(cmp.addressPostalSuggestion()).toBe('012345');
    (cmp as any).postalState = () => ({ state: 'ok' });
    expect(cmp.addressPostalSuggestion()).toBeNull();
  });
});
