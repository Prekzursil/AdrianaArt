import { notFoundMessage } from './not-found.helpers';

describe('notFoundMessage (golden WU)', () => {
  it('resolves known keys and falls back to body', () => {
    expect(notFoundMessage('eyebrow')).toBe('404');
    expect(notFoundMessage('title')).toBe('Page not found');
    expect(notFoundMessage('body')).toContain("doesn't exist");
    expect(notFoundMessage('nope')).toBe(notFoundMessage('body'));
    expect(notFoundMessage(null)).toBe(notFoundMessage('body'));
  });
});
