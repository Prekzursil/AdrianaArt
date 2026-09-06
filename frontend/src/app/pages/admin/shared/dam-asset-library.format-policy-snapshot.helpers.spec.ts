import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-format-policy-snapshot — formatPolicySnapshot. */
describe('DamAssetLibraryComponent formatPolicySnapshot (golden WU)', () => {
  it('formats tries, schedule, jitter, enabled flag', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    expect(
      cmp.formatPolicySnapshot({
        max_attempts: 3,
        backoff_schedule_seconds: [5, 15],
        jitter_ratio: 0.1,
        enabled: true,
      } as any),
    ).toBe('3 tries · [5,15] · jitter 0.10 · on');
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
