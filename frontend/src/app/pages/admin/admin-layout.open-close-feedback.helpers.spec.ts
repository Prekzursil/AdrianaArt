import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-open-close-feedback — openFeedback/closeFeedback. */
describe('AdminLayoutComponent openFeedback/closeFeedback (golden WU)', () => {
  it('resets feedback fields on open and clears flags on close', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).feedbackOpen = false;
    (cmp as any).feedbackMessage = 'old';
    (cmp as any).feedbackContext = 'ctx';
    (cmp as any).feedbackIncludePage = false;
    (cmp as any).feedbackSending = true;
    (cmp as any).feedbackError = 'err';
    cmp.openFeedback();
    expect((cmp as any).feedbackOpen).toBe(true);
    expect((cmp as any).feedbackMessage).toBe('');
    expect((cmp as any).feedbackContext).toBe('');
    expect((cmp as any).feedbackIncludePage).toBe(true);
    expect((cmp as any).feedbackSending).toBe(false);
    expect((cmp as any).feedbackError).toBeNull();
    (cmp as any).feedbackSending = true;
    (cmp as any).feedbackError = 'x';
    cmp.closeFeedback();
    expect((cmp as any).feedbackOpen).toBe(false);
    expect((cmp as any).feedbackSending).toBe(false);
    expect((cmp as any).feedbackError).toBeNull();
  });
});
