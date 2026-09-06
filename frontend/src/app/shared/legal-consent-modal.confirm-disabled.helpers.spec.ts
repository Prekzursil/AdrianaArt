import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-confirm-disabled — confirmDisabled. */
describe('LegalConsentModalComponent confirmDisabled (golden WU)', () => {
  it('is true while loading or errored', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, { loading: true, error: '' });
    expect(cmp.confirmDisabled()).toBe(true);
    Object.assign(cmp as any, { loading: false, error: 'boom' });
    expect(cmp.confirmDisabled()).toBe(true);
    Object.assign(cmp as any, { loading: false, error: '' });
    expect(cmp.confirmDisabled()).toBe(false);
  });
});
