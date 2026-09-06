import { notFoundSuggestedPaths } from './not-found.helpers';

describe('notFoundSuggestedPaths (golden WU)', () => {
  it('returns shop and blog recovery paths', () => {
    expect(notFoundSuggestedPaths()).toEqual([
      { path: '/shop', kind: 'shop' },
      { path: '/blog', kind: 'blog' },
    ]);
  });
});
