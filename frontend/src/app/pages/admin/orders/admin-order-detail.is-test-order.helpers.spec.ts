import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-is-test-order -- isTestOrder. */
describe('AdminOrderDetailComponent isTestOrder (golden WU)', () => {
  it('detects test tag on the current order', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => ({ tags: ['vip'] });
    expect(cmp.isTestOrder()).toBe(false);
    (cmp as any).order = () => ({ tags: ['test'] });
    expect(cmp.isTestOrder()).toBe(true);
    (cmp as any).order = () => null;
    expect(cmp.isTestOrder()).toBe(false);
  });
});
