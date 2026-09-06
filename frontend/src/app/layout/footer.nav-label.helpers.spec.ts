import { FooterComponent } from './footer.component';

/** Golden WU footer-nav-label — navLabel. */
describe('FooterComponent navLabel (golden WU)', () => {
  function bare(lang: string): FooterComponent {
    const cmp = Object.create(FooterComponent.prototype) as FooterComponent;
    Object.assign(cmp as any, { translate: { currentLang: lang } });
    return cmp;
  }

  it('returns trimmed label for current language', () => {
    const link: any = { label: { en: ' Shop ', ro: ' Magazin ' } };
    expect(bare('en').navLabel(link)).toBe('Shop');
    expect(bare('RO').navLabel(link)).toBe('Magazin');
    expect(bare('en').navLabel({ label: { en: '', ro: 'X' } } as any)).toBe('');
  });
});
