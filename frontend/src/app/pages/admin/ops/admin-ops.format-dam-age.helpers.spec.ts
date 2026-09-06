import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-format-dam-age-helpers. */
describe('AdminOpsComponent dam/diagnostics helpers (golden WU)', () => {
  function bare(): AdminOpsComponent {
    return Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
  }

  it('formatDamAge renders s/m/h/n/a', () => {
    const cmp = bare();
    expect(cmp.formatDamAge(null)).toBe('n/a');
    expect(cmp.formatDamAge(undefined)).toBe('n/a');
    expect(cmp.formatDamAge(12)).toBe('12s');
    expect(cmp.formatDamAge(125)).toBe('2m');
    expect(cmp.formatDamAge(7200)).toBe('2h');
  });

  it('diagnosticsBadgeClass maps status tones', () => {
    const cmp = bare();
    expect(cmp.diagnosticsBadgeClass('ok')).toContain('emerald');
    expect(cmp.diagnosticsBadgeClass('warning')).toContain('amber');
    expect(cmp.diagnosticsBadgeClass('error')).toContain('rose');
    expect(cmp.diagnosticsBadgeClass('other')).toContain('slate');
  });
});
