import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU admin-ops-diagnostics-badge — diagnosticsBadgeClass arms. */
describe('AdminOpsComponent diagnosticsBadgeClass (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
  }

  it('maps ok / warning / error / unknown to palette classes', () => {
    const cmp = createCmp();
    expect(cmp.diagnosticsBadgeClass('ok')).toContain('emerald');
    expect(cmp.diagnosticsBadgeClass('OK')).toContain('emerald');
    expect(cmp.diagnosticsBadgeClass(' warning ')).toContain('amber');
    expect(cmp.diagnosticsBadgeClass('error')).toContain('rose');
    expect(cmp.diagnosticsBadgeClass('unknown')).toContain('slate');
    expect(cmp.diagnosticsBadgeClass('')).toContain('slate');
  });
});
