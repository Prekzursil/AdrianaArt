import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-next -- next. */
describe('AdminReturnsComponent next (golden WU)', () => {
  it('increments page and loads when hasNext', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      hasNext: jasmine.createSpy('hasNext').and.returnValue(true),
      meta: jasmine.createSpy('meta').and.returnValue({ page: 2 }),
      page: 2,
      load: jasmine.createSpy('load'),
    });
    cmp.next();
    expect((cmp as any).page).toBe(3);
    expect((cmp as any).load).toHaveBeenCalled();
  });

  it('no-ops when hasNext is false', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      hasNext: jasmine.createSpy('hasNext').and.returnValue(false),
      page: 2,
      load: jasmine.createSpy('load'),
    });
    cmp.next();
    expect((cmp as any).page).toBe(2);
    expect((cmp as any).load).not.toHaveBeenCalled();
  });
});
