import { AdminFavoritesService } from './admin-favorites.service';

/** Golden WU admin-favorites-is-favorite — isFavorite. */
describe('AdminFavoritesService isFavorite (golden WU)', () => {
  it('returns false for blank keys and true when key matches', () => {
    const svc = Object.create(AdminFavoritesService.prototype) as AdminFavoritesService;
    Object.assign(svc as any, {
      items: () => [{ key: 'orders' }, { key: 'users' }],
    });
    expect(svc.isFavorite('')).toBe(false);
    expect(svc.isFavorite('  ')).toBe(false);
    expect(svc.isFavorite('orders')).toBe(true);
    expect(svc.isFavorite('missing')).toBe(false);
  });
});
