import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU gdpr-status-pill-helpers. */
describe('AdminGdprComponent status/access helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminGdprComponent {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      auth: { isAdmin: () => false },
      ...overrides,
    });
    return cmp;
  }

  it('statusPill maps known statuses', () => {
    const cmp = bare();
    expect(cmp.statusPill('succeeded')).toContain('emerald');
    expect(cmp.statusPill('failed')).toContain('rose');
    expect(cmp.statusPill('running')).toContain('indigo');
    expect(cmp.statusPill('queued')).toContain('slate');
  });

  it('canAdminActions mirrors auth.isAdmin', () => {
    expect(bare().canAdminActions()).toBe(false);
    expect(bare({ auth: { isAdmin: () => true } }).canAdminActions()).toBe(true);
  });
});
