import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-export-action-label-key — exportActionLabelKey. */
describe('AccountState exportActionLabelKey (golden WU)', () => {
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

  it('maps job status to action label keys', () => {
    expect(bare({ exportJobLoading: signal(true) }).exportActionLabelKey()).toBe(
      'account.privacy.export.actionWorking',
    );
    expect(bare().exportActionLabelKey()).toBe('account.privacy.export.actionGenerate');
    expect(bare({ exportJob: signal({ status: 'succeeded' }) }).exportActionLabelKey()).toBe(
      'account.privacy.export.actionDownload',
    );
    expect(
      bare({ exportJob: signal({ status: 'succeeded' }), exportingData: true }).exportActionLabelKey(),
    ).toBe('account.privacy.export.actionDownloading');
    expect(bare({ exportJob: signal({ status: 'failed' }) }).exportActionLabelKey()).toBe(
      'account.privacy.export.actionRetry',
    );
    expect(bare({ exportJob: signal({ status: 'running' }) }).exportActionLabelKey()).toBe(
      'account.privacy.export.actionGenerating',
    );
  });
});
