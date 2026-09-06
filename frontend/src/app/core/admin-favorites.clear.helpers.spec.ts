import { AdminFavoritesService } from './admin-favorites.service';

/** Golden WU admin-favorites-clear — clear. */
describe('AdminFavoritesService clear (golden WU)', () => {
  it('no-ops when empty; otherwise saves empty with prior as revert', () => {
    const svc = Object.create(AdminFavoritesService.prototype) as AdminFavoritesService;
    const saves: any[] = [];
    Object.assign(svc as any, {
      items: () => [],
      save: (next: any[], revert: any[]) => saves.push([next, revert]),
    });
    svc.clear();
    expect(saves).toEqual([]);

    const prev = [{ key: 'a' }];
    Object.assign(svc as any, { items: () => prev });
    svc.clear();
    expect(saves).toEqual([[[], prev]]);
  });
});
