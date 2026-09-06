import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-policy-helpers. */
describe('DamAssetLibraryComponent retry-policy helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): DamAssetLibraryComponent {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      auth: { role: () => 'customer' },
      ...overrides,
    });
    return cmp;
  }

  it('canEditRetryPolicies allows owner/admin only', () => {
    expect(bare().canEditRetryPolicies()).toBe(false);
    expect(bare({ auth: { role: () => 'OWNER' } }).canEditRetryPolicies()).toBe(true);
    expect(bare({ auth: { role: () => 'admin' } }).canEditRetryPolicies()).toBe(true);
  });

  it('formatPolicySnapshot renders tries/schedule/jitter/enabled', () => {
    const cmp = bare();
    expect(
      cmp.formatPolicySnapshot({
        max_attempts: 5,
        backoff_schedule_seconds: [30, 120],
        jitter_ratio: 0.15,
        enabled: true,
      } as any),
    ).toBe('5 tries · [30,120] · jitter 0.15 · on');
    expect(
      cmp.formatPolicySnapshot({
        max_attempts: 1,
        backoff_schedule_seconds: [],
        jitter_ratio: 0,
        enabled: false,
      } as any),
    ).toBe('1 tries · [] · jitter 0.00 · off');
  });
});
