import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-save -- save. */
describe('AdminSupportComponent save (golden WU)', () => {
  it('returns early when nothing is selected', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      selected: jasmine.createSpy('selected').and.returnValue(null),
      saving: { set: jasmine.createSpy('set') },
    });
    cmp.save();
    expect((cmp as any).saving.set).not.toHaveBeenCalled();
  });
});
