import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-customer-label — customerLabel. */
describe('AdminOrdersComponent customerLabel (golden WU)', () => {
  it('prefers email+username, then either, else guest key', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).translate = { instant: (k: string) => `T:${k}` };
    expect(
      cmp.customerLabel({ customer_email: 'a@x', customer_username: 'ann' } as any),
    ).toBe('a@x (ann)');
    expect(cmp.customerLabel({ customer_email: 'a@x', customer_username: '' } as any)).toBe('a@x');
    expect(cmp.customerLabel({ customer_email: '', customer_username: 'ann' } as any)).toBe('ann');
    expect(cmp.customerLabel({ customer_email: '  ', customer_username: null } as any)).toBe(
      'T:adminUi.orders.guest',
    );
  });
});
