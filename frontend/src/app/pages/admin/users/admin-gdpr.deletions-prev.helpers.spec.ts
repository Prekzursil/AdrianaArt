import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU admin-gdpr-deletions-prev -- deletionsPrev. */
describe('AdminGdprComponent deletionsPrev (golden WU)', () => {
  it('decrements deletions page with a floor of 1', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      deletionsPage: 1,
      loadDeletions: jasmine.createSpy('loadDeletions'),
    });
    cmp.deletionsPrev();
    expect((cmp as any).deletionsPage).toBe(1);
    (cmp as any).deletionsPage = 4;
    cmp.deletionsPrev();
    expect((cmp as any).deletionsPage).toBe(3);
    expect((cmp as any).loadDeletions).toHaveBeenCalledTimes(2);
  });
});
