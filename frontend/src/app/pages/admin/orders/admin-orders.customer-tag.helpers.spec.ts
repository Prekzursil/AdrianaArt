import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-customer-tag-helpers. */
describe('AdminOrdersComponent customer/tag helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      translate: {
        instant: jasmine.createSpy('instant').and.callFake((k: string) => k),
      },
      tagColorOverrides: {},
      ...overrides,
    });
    return cmp;
  }

  it('customerLabel combines email/username or guest key', () => {
    const cmp = bare();
    expect(cmp.customerLabel({ customer_email: 'a@x', customer_username: 'alice' } as any)).toBe(
      'a@x (alice)',
    );
    expect(cmp.customerLabel({ customer_email: 'a@x', customer_username: '' } as any)).toBe('a@x');
    expect(cmp.customerLabel({ customer_email: '', customer_username: '' } as any)).toBe(
      'adminUi.orders.guest',
    );
  });

  it('tagLabel translates when key exists else raw; tagChipColorClass returns string', () => {
    const cmp = bare({
      translate: {
        instant: jasmine.createSpy('instant').and.callFake((k: string) =>
          k === 'adminUi.orders.tags.vip' ? 'VIP' : k,
        ),
      },
    });
    expect(cmp.tagLabel('vip')).toBe('VIP');
    expect(cmp.tagLabel('unknown')).toBe('unknown');
    expect(typeof cmp.tagChipColorClass('vip')).toBe('string');
  });
});
