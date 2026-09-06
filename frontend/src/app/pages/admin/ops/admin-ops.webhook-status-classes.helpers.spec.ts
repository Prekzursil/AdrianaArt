import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-webhook-status-classes — webhookStatusClasses. */
describe('AdminOpsComponent webhookStatusClasses (golden WU)', () => {
  it('maps failed/processed and falls back', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    expect(cmp.webhookStatusClasses('FAILED')).toContain('rose');
    expect(cmp.webhookStatusClasses('processed')).toContain('emerald');
    expect(cmp.webhookStatusClasses('pending')).toContain('slate');
  });
});
