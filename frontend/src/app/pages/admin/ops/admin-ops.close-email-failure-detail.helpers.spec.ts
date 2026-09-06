import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-close-email-failure-detail -- closeEmailFailureDetail. */
describe('AdminOpsComponent closeEmailFailureDetail (golden WU)', () => {
  it('clears selectedEmailFailure', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    Object.assign(cmp as any, {
      selectedEmailFailure: { set: jasmine.createSpy('set') },
    });
    cmp.closeEmailFailureDetail();
    expect((cmp as any).selectedEmailFailure.set).toHaveBeenCalledWith(null);
  });
});
