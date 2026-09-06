import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-start-new-template -- startNewTemplate. */
describe('AdminSupportComponent startNewTemplate (golden WU)', () => {
  it('clears draft fields and opens form', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      templateEditingId: 'x',
      templateTitle: 't',
      templateBodyEn: 'en',
      templateBodyRo: 'ro',
      templateActive: false,
      templateFormOpen: { set: jasmine.createSpy('set') },
    });
    cmp.startNewTemplate();
    expect((cmp as any).templateEditingId).toBeNull();
    expect((cmp as any).templateTitle).toBe('');
    expect((cmp as any).templateBodyEn).toBe('');
    expect((cmp as any).templateBodyRo).toBe('');
    expect((cmp as any).templateActive).toBe(true);
    expect((cmp as any).templateFormOpen.set).toHaveBeenCalledWith(true);
  });
});
