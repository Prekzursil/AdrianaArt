import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-customer-label — customerLabel. */
describe('AdminOrderDetailComponent customerLabel (golden WU)', () => {
  it('combines email/username or falls back to guest', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant: (k: string) => (k === 'adminUi.orders.guest' ? 'Guest' : k) };
    (cmp as any).order = () => null;
    expect(cmp.customerLabel()).toBe('');
    (cmp as any).order = () => ({ customer_email: 'a@b.c', customer_username: 'ann' });
    expect(cmp.customerLabel()).toBe('a@b.c (ann)');
    (cmp as any).order = () => ({ customer_email: 'a@b.c', customer_username: '' });
    expect(cmp.customerLabel()).toBe('a@b.c');
    (cmp as any).order = () => ({ customer_email: '', customer_username: '' });
    expect(cmp.customerLabel()).toBe('Guest');
  });
});
