import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-first-image-focal — firstImageFocal. */
describe('LegalConsentModalComponent firstImageFocal (golden WU)', () => {
  it('reads focal coords from the first image and defaults when absent', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, { images: [] });
    expect(cmp.firstImageFocal()).toBe('50% 50%');
    Object.assign(cmp as any, { images: [{ url: 'a.jpg', focal_x: 20, focal_y: 80 }] });
    expect(cmp.firstImageFocal()).toBe('20% 80%');
  });
});
