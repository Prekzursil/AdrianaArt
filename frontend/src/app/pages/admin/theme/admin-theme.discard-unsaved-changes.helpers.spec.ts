import { AdminThemeComponent } from './admin-theme.component';

describe('AdminThemeComponent discardUnsavedChanges (golden WU)', () => {
  it('restores baseline values and clears dirty/contrast', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    const syncPreview = jasmine.createSpy('syncPreview');
    (cmp as any).baseline = { primary: '#111' };
    (cmp as any).values = jasmine.createSpy('values').and.callFake(function (this: any, next?: any) {
      if (arguments.length) {
        (this as any)._vals = next;
        return;
      }
      return (this as any)._vals;
    });
    (cmp as any).contrast = jasmine.createSpy('contrast');
    (cmp as any).dirty = jasmine.createSpy('dirty');
    (cmp as any).syncPreview = syncPreview;
    cmp.discardUnsavedChanges();
    expect((cmp as any).values).toHaveBeenCalledWith({ primary: '#111' });
    expect((cmp as any).contrast).toHaveBeenCalledWith({});
    expect((cmp as any).dirty).toHaveBeenCalledWith(false);
    expect(syncPreview).toHaveBeenCalled();
  });
});
