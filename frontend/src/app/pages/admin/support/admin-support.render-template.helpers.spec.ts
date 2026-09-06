import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-render-template — renderTemplate. */
describe('AdminSupportComponent renderTemplate (golden WU)', () => {
  it('substitutes ticket placeholders', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    const fn = (AdminSupportComponent.prototype as any).renderTemplate as (
      this: AdminSupportComponent,
      body: string,
      ticket: { name?: string; email?: string; order_reference?: string; id?: string },
    ) => string;
    const ticket = {
      name: 'Ada',
      email: 'ada@example.com',
      order_reference: 'ORD-1',
      id: 't-9',
    };
    expect(
      fn.call(
        cmp,
        'Hi {{customer_name}} <{{customer_email}}> ref={{order_reference}} #{{ticket_id}}',
        ticket,
      ),
    ).toBe('Hi Ada <ada@example.com> ref=ORD-1 #t-9');
    expect(fn.call(cmp, '', ticket)).toBe('');
  });
});
