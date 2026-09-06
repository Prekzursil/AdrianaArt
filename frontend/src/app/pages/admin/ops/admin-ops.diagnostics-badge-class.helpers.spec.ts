import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU admin-ops-diagnostics-badge-class — diagnosticsBadgeClass. */
describe('AdminOpsComponent diagnosticsBadgeClass (golden WU)', () => {
  it('maps status keys to badge classes', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    expect(cmp.diagnosticsBadgeClass(' OK ')).toContain('emerald');
    expect(cmp.diagnosticsBadgeClass('Warning')).toContain('amber');
    expect(cmp.diagnosticsBadgeClass('error')).toContain('rose');
    expect(cmp.diagnosticsBadgeClass('unknown')).toContain('slate');
  });
});
