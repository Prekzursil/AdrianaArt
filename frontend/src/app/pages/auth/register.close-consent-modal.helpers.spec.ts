import { RegisterComponent } from './register.component';

/** Golden WU register-close-consent-modal — closeConsentModal. */
describe('RegisterComponent closeConsentModal (golden WU)', () => {
  it('clears consent modal open state', () => {
    const cmp = Object.create(RegisterComponent.prototype) as RegisterComponent;
    Object.assign(cmp as any, {
      consentModalOpen: true,
      consentModalSlug: 'privacy',
      consentModalTarget: 'terms',
    });
    cmp.closeConsentModal();
    expect((cmp as any).consentModalOpen).toBe(false);
    expect((cmp as any).consentModalSlug).toBe('');
    expect((cmp as any).consentModalTarget).toBeNull();
  });
});
