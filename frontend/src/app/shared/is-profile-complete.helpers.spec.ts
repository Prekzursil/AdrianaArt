import { isProfileComplete } from './profile-requirements';

describe('isProfileComplete (golden WU)', () => {
  it('true only when no missing required fields', () => {
    expect(isProfileComplete(null)).toBe(false);
    expect(
      isProfileComplete({
        name: 'Ada',
        username: 'ada',
        first_name: 'Ada',
        last_name: 'L',
        date_of_birth: '2000-01-01',
        phone: '+40',
      } as any),
    ).toBe(true);
    expect(isProfileComplete({ name: 'Ada' } as any)).toBe(false);
  });
});
