import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-first-image-url — firstImageUrl. */
describe('LegalConsentModalComponent firstImageUrl (golden WU)', () => {
  it('returns the first image url or null', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, { images: [{ url: '/a.png' }] });
    expect(cmp.firstImageUrl()).toBe('/a.png');
    Object.assign(cmp as any, { images: [] });
    expect(cmp.firstImageUrl()).toBeNull();
  });
});
