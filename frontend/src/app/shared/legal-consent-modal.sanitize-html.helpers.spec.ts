import { LegalConsentModalComponent } from './legal-consent-modal.component';

/** Golden WU legal-consent-sanitize-html — sanitizeHtml. */
describe('LegalConsentModalComponent sanitizeHtml (golden WU)', () => {
  it('sanitizes via DomSanitizer and falls back to empty string', () => {
    const cmp = Object.create(LegalConsentModalComponent.prototype) as LegalConsentModalComponent;
    Object.assign(cmp as any, {
      sanitizer: {
        sanitize: (_ctx: unknown, v: string) => (v === 'x' ? '<b>x</b>' : null),
      },
    });
    expect(cmp.sanitizeHtml('x')).toBe('<b>x</b>');
    expect(cmp.sanitizeHtml(null)).toBe('');
    expect(cmp.sanitizeHtml(undefined)).toBe('');
  });
});
