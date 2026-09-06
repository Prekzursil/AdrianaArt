import { notFoundHomeLinks } from './not-found.helpers';

describe('notFoundHomeLinks (golden WU)', () => {
  it('returns the home escape link', () => {
    expect(notFoundHomeLinks()).toEqual([{ path: '/', kind: 'home' }]);
  });
});
