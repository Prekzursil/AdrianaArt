import { errorNavLinks } from './error.helpers';

describe('errorNavLinks (golden WU)', () => {
  it('returns home/shop/blog escape routes', () => {
    expect(errorNavLinks()).toEqual([
      { path: '/', kind: 'home' },
      { path: '/shop', kind: 'shop' },
      { path: '/blog', kind: 'blog' },
    ]);
  });
});
