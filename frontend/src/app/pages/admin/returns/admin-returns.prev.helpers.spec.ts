import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-prev -- prev. */
describe('AdminReturnsComponent prev (golden WU)', () => {
  it('decrements page and loads when hasPrev', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      hasPrev: jasmine.createSpy('hasPrev').and.returnValue(true),
      meta: jasmine.createSpy('meta').and.returnValue({ page: 3 }),
      page: 3,
      load: jasmine.createSpy('load'),
    });
    cmp.prev();
    expect((cmp as any).page).toBe(2);
    expect((cmp as any).load).toHaveBeenCalled();
  });

  it('no-ops when hasPrev is false', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      hasPrev: jasmine.createSpy('hasPrev').and.returnValue(false),
      page: 1,
      load: jasmine.createSpy('load'),
    });
    cmp.prev();
    expect((cmp as any).page).toBe(1);
    expect((cmp as any).load).not.toHaveBeenCalled();
  });
});
