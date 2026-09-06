import { AccountState } from './account.state';

describe('AccountState lockerLabel (golden WU)', () => {
  it('returns null unless locker delivery; joins name/address', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;

    expect(cmp.lockerLabel({ delivery_type: 'home' } as any)).toBeNull();
    expect(
      cmp.lockerLabel({ delivery_type: 'locker', locker_name: '', locker_address: '' } as any),
    ).toBeNull();
    expect(
      cmp.lockerLabel({
        delivery_type: 'LOCKER',
        locker_name: '  Box A ',
        locker_address: ' Str 1 ',
      } as any),
    ).toBe('Box A — Str 1');
    expect(
      cmp.lockerLabel({
        delivery_type: 'locker',
        locker_name: 'Only',
        locker_address: '  ',
      } as any),
    ).toBe('Only');
  });
});
