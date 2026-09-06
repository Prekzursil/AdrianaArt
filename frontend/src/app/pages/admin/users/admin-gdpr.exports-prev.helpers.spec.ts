import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU admin-gdpr-exports-prev -- exportsPrev. */
describe('AdminGdprComponent exportsPrev (golden WU)', () => {
  it('decrements exports page with a floor of 1', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      exportsPage: 1,
      loadExports: jasmine.createSpy('loadExports'),
    });
    cmp.exportsPrev();
    expect((cmp as any).exportsPage).toBe(1);
    (cmp as any).exportsPage = 5;
    cmp.exportsPrev();
    expect((cmp as any).exportsPage).toBe(4);
    expect((cmp as any).loadExports).toHaveBeenCalledTimes(2);
  });
});
