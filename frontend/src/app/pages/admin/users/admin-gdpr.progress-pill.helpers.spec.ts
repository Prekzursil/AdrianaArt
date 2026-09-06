import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — progressPct / statusPill / deletionStatusPill. */
describe('AdminGdprComponent progress/pill helpers (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('progressPct clamps non-finite and out-of-range values', () => {
    const cmp = bare();
    expect(cmp.progressPct({ progress: Number.NaN } as any)).toBe(0);
    expect(cmp.progressPct({ progress: -5 } as any)).toBe(0);
    expect(cmp.progressPct({ progress: 25 } as any)).toBe(25);
    expect(cmp.progressPct({ progress: 150 } as any)).toBe(100);
    expect(cmp.progressPct({} as any)).toBe(0);
  });

  it('statusPill maps export job statuses', () => {
    const cmp = bare();
    expect(cmp.statusPill('succeeded')).toContain('emerald');
    expect(cmp.statusPill('failed')).toContain('rose');
    expect(cmp.statusPill('running')).toContain('indigo');
    expect(cmp.statusPill('queued')).toContain('slate');
  });

  it('deletionStatusPill maps due/cooldown/default', () => {
    const cmp = bare();
    expect(cmp.deletionStatusPill('due')).toContain('rose');
    expect(cmp.deletionStatusPill('cooldown')).toContain('amber');
    expect(cmp.deletionStatusPill('other')).toContain('slate');
  });
});
