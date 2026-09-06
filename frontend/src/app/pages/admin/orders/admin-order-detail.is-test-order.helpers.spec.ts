import { AdminOrderDetailComponent } from './admin-order-detail.component';

describe('AdminOrderDetailComponent isTestOrder (golden WU)', () => {
  it('detects test tag on order', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => ({ tags: ['vip', 'test'] });
    expect(cmp.isTestOrder()).toBe(true);
    (cmp as any).order = () => ({ tags: ['vip'] });
    expect(cmp.isTestOrder()).toBe(false);
    (cmp as any).order = () => ({ tags: null });
    expect(cmp.isTestOrder()).toBe(false);
    (cmp as any).order = () => null;
    expect(cmp.isTestOrder()).toBe(false);
  });
});
