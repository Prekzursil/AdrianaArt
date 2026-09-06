import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-apply-address-phone-suggestion — applyAddressPhoneSuggestion. */
describe('AdminOrderDetailComponent applyAddressPhoneSuggestion (golden WU)', () => {
  it('trims and writes the suggestion into addressPhone', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).addressPhone = '';
    cmp.applyAddressPhoneSuggestion('  +40722123456  ');
    expect((cmp as any).addressPhone).toBe('+40722123456');
  });
});
