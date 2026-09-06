import { formatIdentity } from './user-identity';

describe('formatIdentity (golden WU)', () => {
  it('composes name#tag (username) and falls back through email/id', () => {
    expect(formatIdentity(null, 'anon')).toBe('anon');
    expect(
      formatIdentity({ name: ' Ada ', username: 'ada', name_tag: 42, email: 'a@b.c', id: '1' }),
    ).toBe('Ada#42 (ada)');
    expect(formatIdentity({ name: 'Ada', username: 'ada' })).toBe('Ada (ada)');
    expect(formatIdentity({ name: '', username: '', email: ' a@b.c ' })).toBe('a@b.c');
    expect(formatIdentity({ id: ' uuid ' })).toBe('uuid');
    expect(formatIdentity({})).toBe('');
  });
});
