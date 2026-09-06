import { AdminOrderExportsComponent } from './admin-order-exports.component';

/** Golden WU — isExpired for document export rows. */
describe('AdminOrderExportsComponent isExpired (golden WU)', () => {
  function bare(): AdminOrderExportsComponent {
    return Object.create(AdminOrderExportsComponent.prototype) as AdminOrderExportsComponent;
  }

  it('treats missing/invalid expiry as not expired', () => {
    const cmp = bare();
    expect(cmp.isExpired({ expires_at: '' } as any)).toBe(false);
    expect(cmp.isExpired({ expires_at: '   ' } as any)).toBe(false);
    expect(cmp.isExpired({ expires_at: 'not-a-date' } as any)).toBe(false);
  });

  it('flags past expiry and not future', () => {
    const cmp = bare();
    expect(cmp.isExpired({ expires_at: '2000-01-01T00:00:00Z' } as any)).toBe(true);
    expect(cmp.isExpired({ expires_at: '2999-01-01T00:00:00Z' } as any)).toBe(false);
  });
});
