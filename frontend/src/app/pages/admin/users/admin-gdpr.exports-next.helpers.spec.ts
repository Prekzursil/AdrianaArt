import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU admin-gdpr-exports-next -- exportsNext. */
describe('AdminGdprComponent exportsNext (golden WU)', () => {
  it('increments exports page and reloads', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      exportsPage: 1,
      loadExports: jasmine.createSpy('loadExports'),
    });
    cmp.exportsNext();
    expect((cmp as any).exportsPage).toBe(2);
    expect((cmp as any).loadExports).toHaveBeenCalled();
  });
});
