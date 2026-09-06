import { offlineNavLinks } from './offline.helpers';

describe('offlineNavLinks (golden WU)', () => {
  it('returns home/shop/blog escape routes', () => {
    expect(offlineNavLinks()).toEqual([
      { path: '/', kind: 'home' },
      { path: '/shop', kind: 'shop' },
      { path: '/blog', kind: 'blog' },
    ]);
  });
});
