import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU — bulkEmailsPreview + segment job/preview helpers. */
describe('AdminCouponsComponent bulk/segment helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      bulkEmails: [] as string[],
      segmentJob: () => null as any,
      segmentPreviewAssign: () => null as any,
      segmentPreviewRevoke: () => null as any,
      ...overrides,
    });
    return cmp;
  }

  it('bulkEmailsPreview joins up to 6 with ellipsis', () => {
    expect(bare().bulkEmailsPreview()).toBe('');
    expect(bare({ bulkEmails: ['a@x', 'b@x'] }).bulkEmailsPreview()).toBe('a@x, b@x');
    const many = Array.from({ length: 8 }, (_, i) => `u${i}@x`);
    expect(bare({ bulkEmails: many }).bulkEmailsPreview()).toBe(
      'u0@x, u1@x, u2@x, u3@x, u4@x, u5@x…',
    );
  });

  it('segmentJobInProgress detects pending/running', () => {
    expect(bare().segmentJobInProgress()).toBe(false);
    expect(bare({ segmentJob: () => ({ status: 'pending' }) }).segmentJobInProgress()).toBe(true);
    expect(bare({ segmentJob: () => ({ status: 'running' }) }).segmentJobInProgress()).toBe(true);
    expect(bare({ segmentJob: () => ({ status: 'done' }) }).segmentJobInProgress()).toBe(false);
  });

  it('segmentCandidatesCount prefers assign/revoke preview then job', () => {
    expect(bare().segmentCandidatesCount()).toBe(0);
    expect(
      bare({ segmentPreviewAssign: () => ({ total_candidates: 4 }) }).segmentCandidatesCount(),
    ).toBe(4);
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
        segmentJob: () => ({ total_candidates: 9 }),
      }).segmentCandidatesCount(),
    ).toBe(9);
  });

  it('segmentPreviewSample formats sample emails', () => {
    expect(bare().segmentPreviewSample()).toBe('');
    expect(
      bare({
        segmentPreviewAssign: () => ({ sample_emails: ['a@x', 'b@x'] }),
      }).segmentPreviewSample(),
    ).toBe('a@x, b@x');
    const sample = Array.from({ length: 8 }, (_, i) => `s${i}@x`);
    expect(
      bare({ segmentPreviewRevoke: () => ({ sample_emails: sample }) }).segmentPreviewSample(),
    ).toBe('s0@x, s1@x, s2@x, s3@x, s4@x, s5@x…');
  });
});
