import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-segment-helpers. */
describe('AdminCouponsComponent segment helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      segmentJob: () => null,
      segmentPreviewAssign: () => null,
      segmentPreviewRevoke: () => null,
      ...overrides,
    });
    return cmp;
  }

  it('segmentJobInProgress is true for pending/running jobs', () => {
    expect(bare().segmentJobInProgress()).toBe(false);
    expect(bare({ segmentJob: () => ({ status: 'pending' }) }).segmentJobInProgress()).toBe(true);
    expect(bare({ segmentJob: () => ({ status: 'running' }) }).segmentJobInProgress()).toBe(true);
    expect(bare({ segmentJob: () => ({ status: 'succeeded' }) }).segmentJobInProgress()).toBe(
      false,
    );
  });

  it('segmentCandidatesCount prefers assign then revoke then job totals', () => {
    expect(bare().segmentCandidatesCount()).toBe(0);
    expect(
      bare({ segmentPreviewAssign: () => ({ total_candidates: 12 }) }).segmentCandidatesCount(),
    ).toBe(12);
    expect(
      bare({
        segmentPreviewAssign: () => null,
        segmentPreviewRevoke: () => ({ total_candidates: 7 }),
      }).segmentCandidatesCount(),
    ).toBe(7);
    expect(
      bare({
        segmentPreviewAssign: () => null,
        segmentPreviewRevoke: () => null,
        segmentJob: () => ({ total_candidates: 3 }),
      }).segmentCandidatesCount(),
    ).toBe(3);
  });

  it('segmentPreviewSample joins up to six emails with ellipsis', () => {
    expect(bare().segmentPreviewSample()).toBe('');
    expect(
      bare({
        segmentPreviewAssign: () => ({
          sample_emails: ['a@x', 'b@x', 'c@x', 'd@x', 'e@x', 'f@x', 'g@x'],
        }),
      }).segmentPreviewSample(),
    ).toBe('a@x, b@x, c@x, d@x, e@x, f@x…');
    expect(
      bare({
        segmentPreviewAssign: () => null,
        segmentPreviewRevoke: () => ({ sample_emails: ['only@x'] }),
      }).segmentPreviewSample(),
    ).toBe('only@x');
  });
});
