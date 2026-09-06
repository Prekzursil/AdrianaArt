import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU admin-gdpr-deletions-next -- deletionsNext. */
describe('AdminGdprComponent deletionsNext (golden WU)', () => {
  it('increments deletions page and reloads', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      deletionsPage: 2,
      loadDeletions: jasmine.createSpy('loadDeletions'),
    });
    cmp.deletionsNext();
    expect((cmp as any).deletionsPage).toBe(3);
    expect((cmp as any).loadDeletions).toHaveBeenCalled();
  });
});
