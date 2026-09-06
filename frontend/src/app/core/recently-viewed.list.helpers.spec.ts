import { RecentlyViewedService } from './recently-viewed.service';

/** Golden WU recently-viewed-list — list. */
describe('RecentlyViewedService list (golden WU)', () => {
  it('delegates to read()', () => {
    const svc = Object.create(RecentlyViewedService.prototype) as RecentlyViewedService;
    const items = [{ slug: 'ring' }];
    Object.assign(svc as any, { read: () => items });
    expect(svc.list()).toBe(items as any);
  });
});
