import { AdminFavoritesService } from './admin-favorites.service';

/** Golden WU admin-favorites-toggle — toggle. */
describe('AdminFavoritesService toggle (golden WU)', () => {
  it('removes when favorite; otherwise adds', () => {
    const svc = Object.create(AdminFavoritesService.prototype) as AdminFavoritesService;
    const calls: any[] = [];
    const item = { key: 'orders', type: 'page', label: 'Orders', subtitle: '', url: '/o', state: null } as any;
    Object.assign(svc as any, {
      isFavorite: (k: string) => k === 'orders',
      remove: (k: string) => calls.push(['remove', k]),
      add: (it: any) => calls.push(['add', it.key]),
    });
    svc.toggle(item);
    expect(calls).toEqual([['remove', 'orders']]);

    Object.assign(svc as any, { isFavorite: () => false });
    calls.length = 0;
    svc.toggle(item);
    expect(calls).toEqual([['add', 'orders']]);
  });
});
