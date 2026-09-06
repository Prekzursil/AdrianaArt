import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-view-email-failure -- viewEmailFailure. */
describe('AdminOpsComponent viewEmailFailure (golden WU)', () => {
  it('selects the email failure row', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    const row = { id: 'ef1' } as any;
    Object.assign(cmp as any, {
      selectedEmailFailure: { set: jasmine.createSpy('set') },
    });
    cmp.viewEmailFailure(row);
    expect((cmp as any).selectedEmailFailure.set).toHaveBeenCalledWith(row);
  });
});
