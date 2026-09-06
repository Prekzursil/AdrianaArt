import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-close-webhook-detail -- closeWebhookDetail. */
describe('AdminOpsComponent closeWebhookDetail (golden WU)', () => {
  it('clears selectedWebhook', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    Object.assign(cmp as any, {
      selectedWebhook: { set: jasmine.createSpy('set') },
    });
    cmp.closeWebhookDetail();
    expect((cmp as any).selectedWebhook.set).toHaveBeenCalledWith(null);
  });
});
