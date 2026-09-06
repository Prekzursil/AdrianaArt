import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-postal-state — postalState. */
describe('AdminOrderDetailComponent postalState (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  function call(country: string, postal: string | null | undefined) {
    const cmp = createCmp();
    return (AdminOrderDetailComponent.prototype as any).postalState.call(cmp, country, postal) as {
      state: string;
      suggestion?: string;
    };
  }

  it('validates RO postal codes and accepts others', () => {
    expect(call('RO', null)).toEqual({ state: 'invalid' });
    expect(call('RO', '12345')).toEqual({ state: 'invalid' });
    expect(call('RO', '123456')).toEqual({ state: 'ok' });
    expect(call('RO', '123-456')).toEqual({ state: 'warn', suggestion: '123456' });
    expect(call('US', '90210')).toEqual({ state: 'ok' });
  });
});
