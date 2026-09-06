import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-address-issue-keys — addressIssueKeys. */
describe('AdminOrderDetailComponent addressIssueKeys (golden WU)', () => {
  it('returns [] for null addr; collects phone/postal issue keys', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    expect(cmp.addressIssueKeys(null, 'shipping')).toEqual([]);

    (cmp as any).normalizeCountry = () => 'RO';
    (cmp as any).phoneState = () => ({ state: 'missing' });
    (cmp as any).postalState = () => ({ state: 'invalid' });
    const keys = cmp.addressIssueKeys(
      { country: 'RO', phone: '', postal_code: 'x' } as any,
      'shipping',
    );
    expect(keys).toContain('adminUi.orders.addressValidate.phoneMissing');
    expect(keys).toContain('adminUi.orders.addressValidate.postalInvalidRo');

    (cmp as any).phoneState = () => ({ state: 'ok' });
    (cmp as any).postalState = () => ({ state: 'ok' });
    expect(cmp.addressIssueKeys({ country: 'RO' } as any, 'billing')).toEqual([]);
  });
});
