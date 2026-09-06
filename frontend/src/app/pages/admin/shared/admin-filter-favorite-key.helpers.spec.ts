import { adminFilterFavoriteKey } from './admin-filter-favorites';

describe('adminFilterFavoriteKey (golden WU)', () => {
  it('is stable for equal filters and scoped by collection', () => {
    const a = adminFilterFavoriteKey('orders', { status: 'open' });
    const b = adminFilterFavoriteKey('orders', { status: 'open' });
    const c = adminFilterFavoriteKey('products', { status: 'open' });
    expect(a).toBe(b);
    expect(a).toMatch(/^filter:orders:[0-9a-z]+$/);
    expect(c).toMatch(/^filter:products:/);
    expect(c).not.toBe(a);
  });
});
