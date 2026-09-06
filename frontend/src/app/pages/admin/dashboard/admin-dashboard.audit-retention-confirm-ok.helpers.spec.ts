import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-audit-retention-confirm-ok — auditRetentionConfirmOk. */
describe('AdminDashboardComponent auditRetentionConfirmOk (golden WU)', () => {
  function bare(confirm: string): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { auditRetentionConfirm: confirm });
    return cmp;
  }

  it('requires trimmed PURGE', () => {
    expect(bare('').auditRetentionConfirmOk()).toBe(false);
    expect(bare('purge').auditRetentionConfirmOk()).toBe(true);
    expect(bare(' PURGE ').auditRetentionConfirmOk()).toBe(true);
    expect(bare('NO').auditRetentionConfirmOk()).toBe(false);
  });
});
