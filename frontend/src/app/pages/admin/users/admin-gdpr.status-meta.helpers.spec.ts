import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU gdpr-status-meta-helpers. */
describe('AdminGdprComponent status/meta helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminGdprComponent {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      auth: { isAdmin: () => true },
      exportsMeta: () => null,
      deletionsMeta: () => null,
      translate: { instant: jasmine.createSpy('instant').and.callFake((k: string, m?: any) => `${k}:${JSON.stringify(m || {})}`) },
      deletionBusyUserId: () => null,
      executeDeletionPassword: '',
      ...overrides,
    });
    return cmp;
  }

  it('canAdminActions mirrors auth.isAdmin', () => {
    expect(bare().canAdminActions()).toBe(true);
    expect(bare({ auth: { isAdmin: () => false } }).canAdminActions()).toBe(false);
  });

  it('exportsMetaText / deletionsMetaText translate pagination meta or empty', () => {
    expect(bare().exportsMetaText()).toBe('');
    const cmp = bare({ exportsMeta: () => ({ page: 1, total_pages: 2 }) });
    expect(cmp.exportsMetaText()).toContain('adminUi.gdpr.pagination');
    expect(bare({ deletionsMeta: () => ({ page: 3 }) }).deletionsMetaText()).toContain(
      'adminUi.gdpr.pagination',
    );
  });

  it('progressPct clamps finite job progress', () => {
    const cmp = bare();
    expect(cmp.progressPct({ progress: 40 } as any)).toBe(40);
    expect(cmp.progressPct({ progress: -5 } as any)).toBe(0);
    expect(cmp.progressPct({ progress: 150 } as any)).toBe(100);
    expect(cmp.progressPct({ progress: Number.NaN } as any)).toBe(0);
  });

  it('statusPill / deletionStatusPill map statuses; confirm disabled when busy/blank', () => {
    const cmp = bare();
    expect(cmp.statusPill('succeeded')).toContain('emerald');
    expect(cmp.statusPill('failed')).toContain('rose');
    expect(cmp.statusPill('running')).toContain('indigo');
    expect(cmp.statusPill('queued')).toContain('slate');
    expect(cmp.deletionStatusPill('due')).toContain('rose');
    expect(cmp.deletionStatusPill('cooldown')).toContain('amber');
    expect(cmp.deletionStatusPill('done')).toContain('slate');
    expect(bare({ executeDeletionPassword: '' }).executeDeletionConfirmDisabled()).toBe(true);
    expect(
      bare({ executeDeletionPassword: 'x', deletionBusyUserId: () => 'u1' }).executeDeletionConfirmDisabled(),
    ).toBe(true);
    expect(
      bare({ executeDeletionPassword: 'secret', deletionBusyUserId: () => null }).executeDeletionConfirmDisabled(),
    ).toBe(false);
  });
});
