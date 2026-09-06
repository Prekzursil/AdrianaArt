import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-close-shipment-editor -- closeShipmentEditor. */
describe('AdminOrderDetailComponent closeShipmentEditor (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).closeShipmentEditor()).not.toThrow();
  });
});
