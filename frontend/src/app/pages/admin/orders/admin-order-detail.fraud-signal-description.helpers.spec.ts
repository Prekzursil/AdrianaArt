import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-fraud-signal-description — fraudSignalDescription. */
describe('AdminOrderDetailComponent fraudSignalDescription (golden WU)', () => {
  it('translates description key with params or returns empty when missing', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).fraudSignalParams = () => ({ count: 3 });
    (cmp as any).translate = {
      instant: (k: string, p?: any) =>
        k === 'adminUi.orders.fraudSignals.signals.velocity_email.description'
          ? `seen ${p.count}`
          : k,
    };
    const signal = { code: 'velocity_email' } as any;
    expect(cmp.fraudSignalDescription(signal)).toBe('seen 3');
    (cmp as any).translate = { instant: (k: string) => k };
    expect(cmp.fraudSignalDescription(signal)).toBe('');
  });
});
