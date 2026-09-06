import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-address-phone-suggestion — addressPhoneSuggestion. */
describe('AdminOrderDetailComponent addressPhoneSuggestion (golden WU)', () => {
  it('returns phoneState suggestion when present', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).addressEditorKind = () => 'shipping';
    (cmp as any).addressCountry = 'RO';
    (cmp as any).addressPhone = '0722123456';
    (cmp as any).normalizeCountry = (c: string) => c;
    (cmp as any).phoneState = () => ({ state: 'warn', suggestion: '+40722123456' });
    expect(cmp.addressPhoneSuggestion()).toBe('+40722123456');
    (cmp as any).phoneState = () => ({ state: 'ok' });
    expect(cmp.addressPhoneSuggestion()).toBeNull();
  });
});
