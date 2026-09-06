import { initialsFromIdentity } from './user-identity';

describe('initialsFromIdentity (golden WU)', () => {
  it('builds up to two initials from name/username/email', () => {
    expect(initialsFromIdentity(null)).toBe('?');
    expect(initialsFromIdentity({ name: 'Ada Lovelace' })).toBe('AL');
    expect(initialsFromIdentity({ username: 'ada_lovelace' })).toBe('AL');
    expect(initialsFromIdentity({ email: 'ada@example.com' })).toBe('AC');
    expect(initialsFromIdentity({})).toBe('?');
  });
});
