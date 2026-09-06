import { AdminRecentService } from './admin-recent.service';

/** Golden WU admin-recent-clear — clear. */
describe('AdminRecentService clear (golden WU)', () => {
  it('empties items and writes when user is known', () => {
    const svc = Object.create(AdminRecentService.prototype) as AdminRecentService;
    const writes: any[] = [];
    Object.assign(svc as any, {
      auth: { user: () => ({ id: 'u1' }) },
      items: { set: (v: any) => writes.push(['items', v]) },
      write: (uid: string, items: any[]) => writes.push(['write', uid, items]),
    });
    svc.clear();
    expect(writes).toEqual([
      ['items', []],
      ['write', 'u1', []],
    ]);
  });
});
