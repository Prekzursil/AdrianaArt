import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-focal-position — focalPosition. */
describe('LegalConsentModalComponent focalPosition (golden WU)', () => {
  it('clamps and rounds focal percentages with a 50/50 default', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(12.6, 87.2)).toBe('13% 87%');
    expect(cmp.focalPosition(-10, 140)).toBe('0% 100%');
  });
});
