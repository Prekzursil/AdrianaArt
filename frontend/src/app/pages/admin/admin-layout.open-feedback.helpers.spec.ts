import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU layout-open-feedback — openFeedback. */
describe('AdminLayoutComponent openFeedback (golden WU)', () => {
  it('resets feedback form state and opens modal', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, {
      feedbackOpen: false,
      feedbackMessage: 'old',
      feedbackContext: 'ctx',
      feedbackIncludePage: false,
      feedbackSending: true,
      feedbackError: 'err',
    });
    cmp.openFeedback();
    expect((cmp as any).feedbackOpen).toBe(true);
    expect((cmp as any).feedbackMessage).toBe('');
    expect((cmp as any).feedbackContext).toBe('');
    expect((cmp as any).feedbackIncludePage).toBe(true);
    expect((cmp as any).feedbackSending).toBe(false);
    expect((cmp as any).feedbackError).toBeNull();
  });
});
