import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-modal-confirm-disabled — confirmDisabled. */
describe('LegalConsentModalComponent confirmDisabled (golden WU)', () => {
  it('disables while loading or errored', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, { loading: false, error: null });
    expect(cmp.confirmDisabled()).toBe(false);
    Object.assign(cmp as any, { loading: true, error: null });
    expect(cmp.confirmDisabled()).toBe(true);
    Object.assign(cmp as any, { loading: false, error: 'boom' });
    expect(cmp.confirmDisabled()).toBe(true);
  });
});
