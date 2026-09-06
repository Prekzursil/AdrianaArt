import { adminFilterFavoriteKey } from './admin-filter-favorites';

/** Golden WU admin-filter-favorite-key-fn -- adminFilterFavoriteKey. */
describe('adminFilterFavoriteKey (golden WU)', () => {
  it('scopes a stable hash of the filter payload', () => {
    const a = adminFilterFavoriteKey('orders', { status: 'paid' });
    const b = adminFilterFavoriteKey('orders', { status: 'paid' });
    const c = adminFilterFavoriteKey('products', { status: 'paid' });
    expect(a).toBe(b);
    expect(a.startsWith('filter:orders:')).toBe(true);
    expect(c.startsWith('filter:products:')).toBe(true);
    expect(a).not.toBe(c);
  });
});
