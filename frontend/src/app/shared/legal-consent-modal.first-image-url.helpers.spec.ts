import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-modal-first-image-url — firstImageUrl. */
describe('LegalConsentModalComponent firstImageUrl (golden WU)', () => {
  it('returns first image url or null', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, { images: [] });
    expect(cmp.firstImageUrl()).toBeNull();
    Object.assign(cmp as any, { images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] });
    expect(cmp.firstImageUrl()).toBe('a.jpg');
  });
});
