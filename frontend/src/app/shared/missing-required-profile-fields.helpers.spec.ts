import { missingRequiredProfileFields } from './profile-requirements';

describe('missingRequiredProfileFields (golden WU)', () => {
  it('lists all when null; only blanks when partial', () => {
    expect(missingRequiredProfileFields(null)).toEqual([
      'name',
      'username',
      'first_name',
      'last_name',
      'date_of_birth',
      'phone',
    ]);
    expect(
      missingRequiredProfileFields({
        name: 'Ada',
        username: 'ada',
        first_name: 'Ada',
        last_name: 'L',
        date_of_birth: '2000-01-01',
        phone: '+40',
      } as any),
    ).toEqual([]);
    expect(
      missingRequiredProfileFields({
        name: ' ',
        username: 'ada',
        first_name: 'Ada',
        last_name: '',
        date_of_birth: '2000-01-01',
        phone: '1',
      } as any),
    ).toEqual(['name', 'last_name']);
  });
});
