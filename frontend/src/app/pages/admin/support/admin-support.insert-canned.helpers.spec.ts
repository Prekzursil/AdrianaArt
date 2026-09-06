import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-insert-canned -- insertCanned. */
describe('AdminSupportComponent insertCanned (golden WU)', () => {
  it('no-ops when no ticket is selected', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      selected: jasmine.createSpy('selected').and.returnValue(null),
      cannedResponses: jasmine.createSpy('cannedResponses'),
    });
    cmp.insertCanned();
    expect((cmp as any).cannedResponses).not.toHaveBeenCalled();
  });
});
