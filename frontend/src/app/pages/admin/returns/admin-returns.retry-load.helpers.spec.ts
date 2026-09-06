import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-retry-load -- retryLoad. */
describe('AdminReturnsComponent retryLoad (golden WU)', () => {
  it('loads board when viewMode is board else list', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      viewMode: jasmine.createSpy('viewMode').and.returnValue('board'),
      loadBoard: jasmine.createSpy('loadBoard'),
      load: jasmine.createSpy('load'),
    });
    cmp.retryLoad();
    expect((cmp as any).loadBoard).toHaveBeenCalled();
    expect((cmp as any).load).not.toHaveBeenCalled();
    (cmp as any).viewMode.and.returnValue('list');
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
