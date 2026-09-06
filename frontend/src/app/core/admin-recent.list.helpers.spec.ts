import { AdminRecentService } from './admin-recent.service';

/** Golden WU admin-recent-list — list. */
describe('AdminRecentService list (golden WU)', () => {
  it('returns the current items signal value', () => {
    const svc = Object.create(AdminRecentService.prototype) as AdminRecentService;
    const items = [{ key: 'orders', url: '/admin/orders' }];
    Object.assign(svc as any, { items: () => items });
    expect(svc.list()).toBe(items as any);
  });
});
