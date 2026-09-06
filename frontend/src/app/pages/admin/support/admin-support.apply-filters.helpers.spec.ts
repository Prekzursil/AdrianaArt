import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-apply-filters -- applyFilters. */
describe('AdminSupportComponent applyFilters (golden WU)', () => {
  it('resets page to 1 and reloads', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      meta: {
        set: jasmine.createSpy('metaSet'),
        ...jasmine.createSpy('meta') as any,
      },
      load: jasmine.createSpy('load'),
    });
    (cmp as any).meta = Object.assign(
      jasmine.createSpy('meta').and.returnValue({ page: 4, limit: 20 }),
      { set: jasmine.createSpy('metaSet') },
    );
    cmp.applyFilters();
    expect((cmp as any).meta.set).toHaveBeenCalledWith(
      jasmine.objectContaining({ page: 1 }),
    );
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
