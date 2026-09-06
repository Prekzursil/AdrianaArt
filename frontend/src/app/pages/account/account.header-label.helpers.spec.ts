import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-header-label — accountHeaderLabel. */
describe('AccountState accountHeaderLabel (golden WU)', () => {
  function bare(user: Record<string, unknown> | null = null): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, { profile: signal(user) });
    return state;
  }

  it('returns ellipsis without username', () => {
    expect(bare(null).accountHeaderLabel()).toBe('...');
    expect(bare({ username: '  ' }).accountHeaderLabel()).toBe('...');
  });

  it('formats username with optional name and tag', () => {
    expect(bare({ username: 'ada' }).accountHeaderLabel()).toBe('ada');
    expect(bare({ username: 'ada', name: 'Ada' }).accountHeaderLabel()).toBe('ada (Ada)');
    expect(bare({ username: 'ada', name: 'Ada', name_tag: 42 }).accountHeaderLabel()).toBe(
      'ada (Ada#42)',
    );
  });

  it('prefers explicit user arg over profile signal', () => {
    const state = bare({ username: 'from-profile' });
    expect(state.accountHeaderLabel({ username: 'override' } as any)).toBe('override');
  });
});
