import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU admin-gdpr-close-execute-deletion-modal -- closeExecuteDeletionModal. */
describe('AdminGdprComponent closeExecuteDeletionModal (golden WU)', () => {
  it('closes modal and clears password/error/target', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      executeDeletionModalOpen: { set: jasmine.createSpy('open') },
      executeDeletionTarget: { set: jasmine.createSpy('target') },
      executeDeletionPassword: 'secret',
      executeDeletionModalError: 'err',
    });
    cmp.closeExecuteDeletionModal();
    expect((cmp as any).executeDeletionModalOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).executeDeletionTarget.set).toHaveBeenCalledWith(null);
    expect((cmp as any).executeDeletionPassword).toBe('');
    expect((cmp as any).executeDeletionModalError).toBe('');
  });
});
