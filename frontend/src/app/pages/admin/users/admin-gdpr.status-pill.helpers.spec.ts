import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — statusPill for GDPR export jobs. */
describe('AdminGdprComponent statusPill (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('maps known statuses and falls back', () => {
    const cmp = bare();
    expect(cmp.statusPill('succeeded')).toContain('emerald');
    expect(cmp.statusPill('failed')).toContain('rose');
    expect(cmp.statusPill('running')).toContain('indigo');
    expect(cmp.statusPill('queued')).toContain('slate');
  });
});
