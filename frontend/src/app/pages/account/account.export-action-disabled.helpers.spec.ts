import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-export-action-disabled — exportActionDisabled. */
describe('AccountState exportActionDisabled (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      exportJob: signal(null),
      exportJobLoading: signal(false),
      exportingData: false,
      ...overrides,
    });
    return state;
  }

  it('disables while exporting/loading/pending/running', () => {
    expect(bare().exportActionDisabled()).toBe(false);
    expect(bare({ exportingData: true }).exportActionDisabled()).toBe(true);
    expect(bare({ exportJobLoading: signal(true) }).exportActionDisabled()).toBe(true);
    expect(bare({ exportJob: signal({ status: 'pending' }) }).exportActionDisabled()).toBe(true);
    expect(bare({ exportJob: signal({ status: 'running' }) }).exportActionDisabled()).toBe(true);
    expect(bare({ exportJob: signal({ status: 'succeeded' }) }).exportActionDisabled()).toBe(false);
  });
});
